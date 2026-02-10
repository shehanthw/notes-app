// src/components/sales-wizard/SalesWizard.tsx - MOBILE FIRST
'use client';

import { useState, useEffect } from 'react';
import { X, ChevronLeft, Check } from 'lucide-react';

interface SalesWizardProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SalesWizard({ isOpen, onClose }: SalesWizardProps) {
  const [step, setStep] = useState(1);

   useEffect(() => {
    if (!isOpen) {
      setStep(1);
    }
  }, [isOpen]);

  const closeWizard = () => {
    onClose();
    setStep(1);
  };

  if (!isOpen) return null;

  // Step 1: Customer
  const Step1 = () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
          1
        </div>
        <h2 className="text-lg font-semibold">Customer Information</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Full Name *</label>
          <input 
            type="text" 
            placeholder="Enter customer name"
            className="w-full p-4 border rounded-2xl bg-gray-50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Phone Number *</label>
          <div className="flex border rounded-2xl overflow-hidden">
            <div className="px-4 bg-gray-100 flex items-center">
              +880
            </div>
            <input 
              type="tel" 
              placeholder="1XXX XXXXXX"
              className="flex-1 p-4 bg-gray-50"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Address *</label>
          <textarea 
            placeholder="House number, Road, Area, City"
            rows={3}
            className="w-full p-4 border rounded-2xl bg-gray-50"
          />
        </div>

        <button className="w-full p-4 border-2 border-dashed border-gray-300 rounded-2xl text-gray-600 flex items-center justify-center gap-2">
          <span>📍</span>
          Use Current Location
        </button>
      </div>
    </div>
  );

  // Step 2: Products
  const Step2 = () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
          2
        </div>
        <h2 className="text-lg font-semibold">Select Products</h2>
      </div>

      <div className="space-y-3">
        {[
          { name: 'Rice (25kg)', price: '৳1,250', stock: 15 },
          { name: 'Oil (5L)', price: '৳900', stock: 3 },
          { name: 'Sugar (2kg)', price: '৳250', stock: 42 },
        ].map((product, i) => (
          <div key={i} className="p-4 border rounded-2xl">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-sm text-gray-500">{product.stock} in stock</p>
              </div>
              <div className="text-lg font-semibold">{product.price}</div>
            </div>
            
            <div className="flex items-center justify-between mt-4">
              <button className="text-gray-500">Remove</button>
              <div className="flex items-center gap-4">
                <button className="h-10 w-10 rounded-full border flex items-center justify-center">－</button>
                <span className="font-semibold">1</span>
                <button className="h-10 w-10 rounded-full border flex items-center justify-center">＋</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full p-4 border-2 border-dashed border-blue-300 text-blue-600 rounded-2xl flex items-center justify-center gap-2">
        <span>＋</span>
        Add Another Product
      </button>
    </div>
  );

  // Step 3: Installment
  const Step3 = () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
          3
        </div>
        <h2 className="text-lg font-semibold">Payment Plan</h2>
      </div>

      <div className="space-y-3">
        {[
          { title: 'Full Payment', desc: 'Pay full amount now' },
          { title: '2 Months Installment', desc: '50% now, 50% next month' },
          { title: '3 Months Installment', desc: '30% now, 35% each month' },
        ].map((plan, i) => (
          <label key={i} className="block">
            <input type="radio" name="plan" className="hidden peer" />
            <div className="p-4 border rounded-2xl peer-checked:border-blue-500 peer-checked:bg-blue-50">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">{plan.title}</div>
                  <div className="text-sm text-gray-500">{plan.desc}</div>
                </div>
                <div className="h-5 w-5 border rounded-full peer-checked:bg-blue-500"></div>
              </div>
            </div>
          </label>
        ))}
      </div>

      <div className="bg-blue-50 p-4 rounded-2xl">
        <div className="flex justify-between mb-2">
          <span>Down Payment</span>
          <span className="font-semibold">৳625</span>
        </div>
        <div className="flex justify-between">
          <span>Monthly Installment</span>
          <span className="font-semibold">৳625 × 2 months</span>
        </div>
      </div>
    </div>
  );

  // Step 4: Review
  const Step4 = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-2">
        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
          4
        </div>
        <h2 className="text-lg font-semibold">Review & Submit</h2>
      </div>

      {/* Customer Summary */}
      <div className="space-y-3">
        <h3 className="font-semibold">Customer</h3>
        <div className="p-4 border rounded-2xl space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-500">Name</span>
            <span className="font-medium">Abdullah Khan</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Phone</span>
            <span className="font-medium">+880 1712 XXX XXX</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Address</span>
            <span className="font-medium text-right">House# 45, Road# 12, Mirpur</span>
          </div>
        </div>
      </div>

      {/* Products Summary */}
      <div className="space-y-3">
        <h3 className="font-semibold">Products</h3>
        <div className="p-4 border rounded-2xl space-y-3">
          <div className="flex justify-between">
            <span>Rice (25kg) × 1</span>
            <span className="font-semibold">৳1,250</span>
          </div>
          <div className="border-t pt-3 flex justify-between">
            <span className="font-semibold">Total</span>
            <span className="text-xl font-bold">৳1,250</span>
          </div>
        </div>
      </div>

      {/* Installment Summary */}
      <div className="space-y-3">
        <h3 className="font-semibold">Payment Plan</h3>
        <div className="p-4 border rounded-2xl">
          <div className="flex justify-between mb-2">
            <span>2 Months Installment</span>
            <span className="font-semibold">৳625 × 2</span>
          </div>
          <div className="text-sm text-gray-500">
            First payment: Today, 25 Jan
          </div>
        </div>
      </div>
    </div>
  );

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50" onClick={closeWizard} />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex flex-col">
        <div className="flex-1 bg-white rounded-t-3xl overflow-hidden flex flex-col">
          
          {/* Header */}
          <div className="sticky top-0 bg-white border-b p-4">
            <div className="flex items-center justify-between">
              {step > 1 ? (
                <button onClick={() => setStep(step - 1)} className="p-2">
                  <ChevronLeft className="h-5 w-5" />
                </button>
              ) : (
                <div className="w-10" />
              )}
              
              <div className="text-center">
                <div className="font-semibold">New Sale</div>
                <div className="text-xs text-gray-500">Step {step} of 4</div>
              </div>
              
              <button onClick={closeWizard} className="p-2">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-4 h-1 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 transition-all duration-300"
                style={{ width: `${(step / 4) * 100}%` }}
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {step === 1 && <Step1 />}
            {step === 2 && <Step2 />}
            {step === 3 && <Step3 />}
            {step === 4 && <Step4 />}
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 border-t bg-white p-4">
            <div className="flex gap-3">
              {step < 4 ? (
                <>
                  {step > 1 && (
                    <button 
                      onClick={() => setStep(step - 1)}
                      className="flex-1 py-4 border rounded-2xl font-medium"
                    >
                      Back
                    </button>
                  )}
                  <button 
                    onClick={() => setStep(step + 1)}
                    className={`flex-1 py-4 rounded-2xl font-medium ${step > 1 ? 'bg-blue-600 text-white' : 'border border-blue-600 text-blue-600'}`}
                  >
                    {step === 1 ? 'Add Products' : 'Continue'}
                  </button>
                </>
              ) : (
                <button 
                  onClick={closeWizard}
                  className="flex-1 py-4 bg-green-600 text-white rounded-2xl font-medium flex items-center justify-center gap-2"
                >
                  <Check className="h-5 w-5" />
                  Complete Sale
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}