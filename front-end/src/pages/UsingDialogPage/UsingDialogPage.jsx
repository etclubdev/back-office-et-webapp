// //must remove this folder
// import React, { useState } from 'react';
// import { ConfirmedDialog } from '../../components/ConfirmedDialog';
// import { getConfirmDialogConfig } from '../../utils/confirmDialogUtil';

// export const UsingDialogPage = () => {
//     const [isOpen, setIsOpen] = useState(true);
//       const [confirmed, setConfirmed] = useState(false);
//       const [actionType, setActionType] = useState("");
    
//       const onClose = () => {
//         setIsOpen(false);
//         setConfirmed(false);
//       }
    
//       const openConfirm = (type) => {
//         setActionType(type);
//         setIsOpen(true);
//       };
      
//       const onConfirm = () => {
//         setIsOpen(false);
//         setConfirmed(true);
//       }
    
//       const dialogConfig = getConfirmDialogConfig("delete");
    
//   return (
//     <div>
//         {isOpen && <ConfirmedDialog 
//                 onClose={onClose}
//                 onConfirm={onConfirm}
//                 {...dialogConfig}
//               />}
//     </div>
//   )
// }
