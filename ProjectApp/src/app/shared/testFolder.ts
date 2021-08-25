// deleteCustomer(key: string): Promise<void> {
//     return this.customersRef.remove(key);
//   }


// deleteCustomer(){    
//     this.customerService.deleteCustomer(this.deletedCustomer.key)
//               .then(() => {
//                 // remove a deletedCustomer from customers list on view
//                 this.customers = this.customers.filter(customer => {
//                   return customer.key != this.deletedCustomer.key;
//                 })
                





        // transition('*=>void', [
        //   animate(50, style({
        //     transform: 'scale(1.05)'
        //   })),
        //   animate(50, style({
        //     transform: 'scale(1)',
        //     opacity: 0.75
        //   })),
        //   animate('120ms ease-out', style({
        //     transform: 'scale(0.68)',
        //     opacity: 0,
        //   })),
        //   animate('150ms ease-out', style({           
        //     height: 0,
        //     transform: 'scale(0.85)',
  
        //     paddingTop: 0,
        //     paddingBottom: 0,
        //     paddingLeft: 0,
        //     paddingRight:0,
        //   }))
        // ])



        // trigger('listAnim', [
        //         transition('* => *', [
        //           query(':enter',[
        //             style({
        //               opacity: 0,
        //               height: 0,
        //             }),
        //             stagger(100, [
        //               animate('0.2s ease')
        //             ])
        //           ], {
        //             optional: true
        //           })
        //         ])
        //       ])