const Checkout = () => {
  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Order Summary</h1>

      {/* Cart Items */}
      <div className="space-y-4">
        {/* Example cart item */}
        <div className="flex justify-between border-b pb-2">
          <p>Product Name x Quantity</p>
          <p>$Price</p>
        </div>
      </div>

      {/* Total */}
      <div className="flex justify-between mt-6 text-lg font-semibold">
        <span>Total:</span>
        <span className="text-green-600">$0.00</span>
      </div>

      {/* Place Order */}
      <div className="mt-8 flex justify-end">
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
