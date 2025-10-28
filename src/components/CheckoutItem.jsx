// src/components/CheckoutItem.jsx

const CheckoutItem = ({ item }) => {

    const renderItems = () => {
        if (item) {
             return (
               <div className="flex items-center justify-between border-b py-3">
                 <div className="flex items-center space-x-4">
                   <img
                     src={item.imageUrl}
                     alt={item.name}
                     className="w-16 h-16 object-cover rounded-md"
                   />
                   <div>
                     <h3 className="font-medium text-lg">{item.name}</h3>
                     <p className="text-sm text-gray-500">
                       Quantity: {item.quantity}
                     </p>
                   </div>
                 </div>
                 <div className="text-right">
                   <p className="font-semibold text-gray-800">
                     ${item.price * item.quantity}
                   </p>
                 </div>
               </div>
             );
        }
        

    

    }

  return <div>{renderItems()}</div>;

    
 
};

export default CheckoutItem;
