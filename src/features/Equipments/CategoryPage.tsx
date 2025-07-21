import React from "react";
import { CategoryTable } from "../../components";

function CategoryPage() {
  return (
    <div>
      <div className="container mx-auto p-6 ">
        {/* Fixed header for User List */}
        <h1 className="text-3xl font-semibold mb-6 sticky top-24 bg-white z-10 border-b-2 border-gray-200">
          Categories
        </h1>
        <CategoryTable></CategoryTable>
      </div>
    </div>
  );
}

export default CategoryPage;
