'use client';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { CheckCircle2, Loader2, Database, Truck } from 'lucide-react';

export default function ModernizedWorkflow() {
    const [orderId, setOrderId] = useState('ORD-99281');
    const [foundOrder, setFoundOrder] = useState(false);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);

    // Form state tailored for Shipping/Delivery
    const [formData, setFormData] = useState({
        customerName: 'JANE DOE',
        shippingAddress: '123 CLOUD ST, AUSTIN, TX',
        productName: 'IBM THINKPAD VINTAGE',
        quantity: '1',
        weight: '2.5',
        orderDate: '2026-08-20',
        deliveryDate: '2026-08-24',
        shippingMode: 'EXPRESS',
        status: 'PROCESSING',
        courierService: 'FEDEX',
        trackingNumber: 'TRK-5592810',
        shippingFee: '15.00',
        taxAmount: '4.50'
    });

    const handleFind = () => {
        setFoundOrder(true);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRun = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!foundOrder) return;
        
        setLoading(true);
        try {
            const res = await fetch('/api/shipping', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ orderId, ...formData })
            });
            const data = await res.json();
            
            if (data.success) {
                setResult({
                    status: 'success',
                    message: 'CREATED: Shipping manifest generated and synced to IBM Cloudant.',
                    docId: data.id,
                });
            } else {
                setResult({ status: 'error', message: data.error });
            }
        } catch (error: any) {
            setResult({ status: 'error', message: error.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="border-b border-slate-800 pb-4">
                <div className="flex items-center justify-between mb-2">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-50 flex items-center gap-3">
                            <Truck className="w-8 h-8 text-blue-500" />
                            Shipping & Delivery · Modernized Workflow
                        </h1>
                        <p className="text-slate-400 mt-1 text-sm tracking-wide">
                            WF-004 · E-commerce Rules Extraction · React + IBM Cloudant Port
                        </p>
                    </div>
                    <Badge variant="brand" className="text-sm px-3 py-1 uppercase font-bold tracking-widest bg-blue-900/50">Synthetic Data Only</Badge>
                </div>
            </div>

            <div className="grid md:grid-cols-12 gap-8">
                {/* Left Column */}
                <div className="md:col-span-4 space-y-6">
                    <Card className="bg-slate-50 border-slate-200">
                        <CardContent className="p-6">
                            <h2 className="text-lg font-bold text-slate-900 mb-1">1. Find Order</h2>
                            <p className="text-sm text-slate-600 mb-4">BR-060 requires a validated payment & order ID.</p>
                            
                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-slate-700 uppercase">Order ID</label>
                                    <div className="flex gap-2">
                                        <Input 
                                            value={orderId} 
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOrderId(e.target.value)}
                                            className="bg-white border-slate-300 text-slate-900" 
                                        />
                                        <Button onClick={handleFind} className="bg-slate-200 text-slate-800 hover:bg-slate-300 border border-slate-300">Find</Button>
                                    </div>
                                </div>

                                {foundOrder && (
                                    <div className="bg-slate-100 border border-slate-200 p-3 rounded text-sm text-slate-700 mt-4">
                                        <div className="font-semibold">{orderId} · PAID · WAREHOUSE 04</div>
                                        <div className="text-blue-700 mt-1">STATUS: READY FOR DISPATCH</div>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-yellow-50 border-yellow-200">
                        <CardContent className="p-5 text-sm">
                            <h3 className="font-bold text-yellow-900 mb-3">Delivery Scenarios</h3>
                            <ul className="space-y-2 text-yellow-800">
                                <li>ORD-99281 · Express / Standard → success</li>
                                <li>ORD-99282 · International → pending customs</li>
                                <li>ORD-88100 · Missing Address → <span className="font-semibold">BR-062 (Reject)</span></li>
                                <li>Duplicate Tracking → <span className="font-semibold">BR-061 (Reject)</span></li>
                            </ul>
                        </CardContent>
                    </Card>

                    {result && (
                        <Card className="bg-green-50 border-green-200">
                            <CardContent className="p-5 text-sm">
                                <h3 className="font-bold text-green-900 mb-2">Result</h3>
                                <div className="text-green-800 flex items-start gap-2">
                                    <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-green-600" />
                                    <div>
                                        <p className="font-medium">{result.message}</p>
                                        <div className="mt-2 text-xs flex items-center gap-1.5 bg-green-100 text-green-900 px-2 py-1 rounded w-fit border border-green-200 overflow-hidden text-ellipsis max-w-full">
                                            <Database className="w-3 h-3 shrink-0" /> 
                                            <span className="truncate">Cloudant ID: {result.docId}</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>

                {/* Right Column */}
                <div className="md:col-span-8">
                    <Card className="bg-white border-slate-200 shadow-sm">
                        <CardContent className="p-6 sm:p-8">
                            <div className="mb-6">
                                <h2 className="text-xl font-bold text-slate-900">2. Generate Shipping Manifest</h2>
                                <p className="text-sm text-slate-600 mt-1">Simulate order dispatch. Synced directly to IBM Cloud.</p>
                            </div>

                            <form onSubmit={handleRun} className="space-y-5">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-slate-700">Customer Name</label>
                                        <Input name="customerName" value={formData.customerName} onChange={handleChange} className="bg-white border-slate-300 text-slate-900 uppercase" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-slate-700">Shipping Address</label>
                                        <Input name="shippingAddress" value={formData.shippingAddress} onChange={handleChange} className="bg-white border-slate-300 text-slate-900 uppercase" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-4">
                                    <div className="space-y-1.5 col-span-2">
                                        <label className="text-xs font-semibold text-slate-700">Product Name</label>
                                        <Input name="productName" value={formData.productName} onChange={handleChange} className="bg-white border-slate-300 text-slate-900" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-slate-700">Quantity</label>
                                        <Input type="number" name="quantity" value={formData.quantity} onChange={handleChange} className="bg-white border-slate-300 text-slate-900" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-slate-700">Order Date</label>
                                        <Input type="date" name="orderDate" value={formData.orderDate} onChange={handleChange} className="bg-white border-slate-300 text-slate-900" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-slate-700">Estimated Delivery Date</label>
                                        <Input type="date" name="deliveryDate" value={formData.deliveryDate} onChange={handleChange} className="bg-white border-slate-300 text-slate-900" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-slate-700">Shipping Mode</label>
                                        <select name="shippingMode" value={formData.shippingMode} onChange={handleChange} className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600">
                                            <option value="STANDARD">STANDARD</option>
                                            <option value="EXPRESS">EXPRESS</option>
                                            <option value="OVERNIGHT">OVERNIGHT</option>
                                        </select>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-slate-700">Courier Service</label>
                                        <select name="courierService" value={formData.courierService} onChange={handleChange} className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600">
                                            <option value="FEDEX">FedEx</option>
                                            <option value="UPS">UPS</option>
                                            <option value="USPS">USPS</option>
                                            <option value="DHL">DHL</option>
                                        </select>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-slate-700">Package Weight (kg)</label>
                                        <Input name="weight" value={formData.weight} onChange={handleChange} className="bg-white border-slate-300 text-slate-900" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-4 pb-4 border-b border-slate-100">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-slate-700">Tracking Number</label>
                                        <Input name="trackingNumber" value={formData.trackingNumber} onChange={handleChange} className="bg-white border-slate-300 text-slate-900 uppercase" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-slate-700">Shipping Fee ($)</label>
                                        <Input name="shippingFee" value={formData.shippingFee} onChange={handleChange} className="bg-white border-slate-300 text-slate-900" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-slate-700">Tax Amount ($)</label>
                                        <Input name="taxAmount" value={formData.taxAmount} onChange={handleChange} className="bg-white border-slate-300 text-slate-900" />
                                    </div>
                                </div>

                                <div className="flex justify-between items-center pt-2">
                                    <div className="text-xs text-slate-500 flex items-center gap-1">
                                        <Database className="w-3 h-3" />
                                        Data securely transmits to IBM Cloudant NoSQL DB
                                    </div>
                                    <Button 
                                        type="submit" 
                                        disabled={!foundOrder || loading}
                                        className="bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                                    >
                                        {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                                        Dispatch Order
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
