import { NextResponse } from 'next/server';
import { CloudantV1 } from '@ibm-cloud/cloudant';
import { IamAuthenticator } from 'ibm-cloud-sdk-core';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Initialize the IBM Cloudant client with the provided credentials
        const authenticator = new IamAuthenticator({
            apikey: process.env.CLOUDANT_APIKEY || '',
        });

        const cloudant = new CloudantV1({
            authenticator: authenticator,
        });

        cloudant.setServiceUrl('https://9496674c-1016-44d0-b203-94428a600385-bluemix.cloudantnosqldb.appdomain.cloud');

        const dbName = 'old-to-new-poc';

        // Ensure database exists
        try {
            await cloudant.getDatabaseInformation({ db: dbName });
        } catch (err: any) {
            if (err.status === 404) {
                await cloudant.putDatabase({ db: dbName });
            } else {
                throw err;
            }
        }

        // Prepare the document according to the UI fields
        const doc = {
            _id: `interment-\${Date.now()}`,
            type: 'synthetic_interment',
            timestamp: new Date().toISOString(),
            data: body,
            // Tag with the PoC rules to demonstrate modern mapping
            verifiedRules: ['BR-060', 'BR-061', 'BR-062', 'BR-063', 'BR-064']
        };

        // Insert into Cloudant
        const response = await cloudant.postDocument({
            db: dbName,
            document: doc
        });

        return NextResponse.json({
            success: true,
            id: response.result.id,
            rev: response.result.rev,
            message: 'Successfully persisted to IBM Cloudant!'
        });
    } catch (error: any) {
        console.error('IBM Cloudant Error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
