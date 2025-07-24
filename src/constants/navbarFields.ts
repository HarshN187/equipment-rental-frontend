export const menuItems = [
  {
    name: "Dashboard",
    href: "/dashboard", // Here we define the href for dashboard
    dropdown: null,
  },
  {
    name: "Customer",
    href: "/customer",
    dropdown: [
      { name: "All Customer", href: "/customer" },
      { name: "Add Customer", href: "/customer/add" },
      { name: "Customer Addresses", href: "/customer/address/add" },
    ],
  },
  {
    name: "Equipment",
    href: "/equipment",
    dropdown: [
      { name: "All Equipment", href: "/equipment" },
      { name: "Add Equipment", href: "/equipment/add" },
      { name: "Categories", href: "/equipment/categories" },
    ],
  },
  {
    name: "Rentals",
    href: "/rentals",
    dropdown: [
      { name: "All Rentals", href: "/rentals" },
      { name: "Create Rental", href: "/rentals/create" },
      // { name: "Active Rentals", href: "/rentals/active" },
      // { name: "Rental History", href: "/rentals/history" },
    ],
  },
  // {
  //   name: "Addresses",
  //   href: "/addresses",
  //   dropdown: [
  //     { name: "All Addresses", href: "/addresses" },
  //     { name: "Add Address", href: "/addresses/add" },
  //   ],
  // }  ,
];
