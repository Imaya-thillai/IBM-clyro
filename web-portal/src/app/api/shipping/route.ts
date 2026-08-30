import { NextResponse } from 'next/server';
import { CloudantV1 } from '@ibm-cloud/cloudant';
import { IamAuthenticator } from 'ibm-cloud-sdk-core';

// IBM Cloudant credentials (clyro-backend key)
const CLOUDANT_URL = 'https://9496674c-1016-44d0-b203-94428a600385-bluemix.cloudantnosqldb.appdomain.cloud';
const CLOUDANT_APIKEY = process.env.CLOUDANT_APIKEY || '';
const DB_NAME = 'cylro-shipping-logs';

function getClient() {
    const authenticator = new IamAuthenticator({ apikey: CLOUDANT_APIKEY });
    const client = new CloudantV1({ authenticator });
    client.setServiceUrl(CLOUDANT_URL);
    return client;
}

async function ensureDb(client: CloudantV1) {
    try {
        await client.getDatabaseInformation({ db: DB_NAME });
    } catch (err: any) {
        if (err.status === 404) {
            await client.putDatabase({ db: DB_NAME });
            console.log(`[CYLRO] Created IBM Cloudant database: ${DB_NAME}`);
        } else {
            throw err;
        }
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const client = getClient();

        await ensureDb(client);

        const doc = {
            _id: `shipping-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
            type: 'shipping_manifest',
            source: 'CYLRO-WebPortal',
            timestamp: new Date().toISOString(),
            verifiedRules: ['BR-060', 'BR-061', 'BR-062', 'BR-063', 'BR-064'],
            data: {
                orderId: body.orderId,
                customerName: body.customerName,
                shippingAddress: body.shippingAddress,
                productName: body.productName,
                quantity: body.quantity,
                weight: body.weight,
                orderDate: body.orderDate,
                deliveryDate: body.deliveryDate,
                shippingMode: body.shippingMode,
                courierService: body.courierService,
                trackingNumber: body.trackingNumber,
                shippingFee: body.shippingFee,
                taxAmount: body.taxAmount,
                status: 'DISPATCHED',
            },
        };

        const response = await client.postDocument({ db: DB_NAME, document: doc });

        return NextResponse.json({
            success: true,
            id: response.result.id,
            rev: response.result.rev,
            database: DB_NAME,
            message: 'Shipping manifest saved to IBM Cloudant successfully!',
        });
    } catch (error: any) {
        console.error('[CYLRO] IBM Cloudant error:', error?.message ?? error);
        return NextResponse.json(
            { success: false, error: error?.message ?? 'Unknown error' },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const client = getClient();
        await ensureDb(client);

        const result = await client.postAllDocs({
            db: DB_NAME,
            includeDocs: true,
            descending: true,
            limit: 50,
        });

        const docs = result.result.rows
            .map((row: any) => row.doc)
            .filter((doc: any) => doc && !doc._id.startsWith('_'));

        return NextResponse.json({ success: true, count: docs.length, records: docs });
    } catch (error: any) {
        console.error('[CYLRO] IBM Cloudant GET error:', error?.message ?? error);
        return NextResponse.json(
            { success: false, error: error?.message ?? 'Unknown error' },
            { status: 500 }
        );
    }
}
