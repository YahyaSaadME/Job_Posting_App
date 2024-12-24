import React from 'react'

const DataSection = () => {
  return (
    <div>

            {/* Stats Section */}
      <div className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <h2 className="text-4xl font-bold text-blue-500">500+</h2>
            <p className="mt-2 text-lg">Users</p>
          </div>
          <div>
            <h2 className="text-4xl font-bold text-blue-500">20+</h2>
            <p className="mt-2 text-lg">Companies</p>
          </div>
          <div>
            <h2 className="text-4xl font-bold text-blue-500">70+</h2>
            <p className="mt-2 text-lg">Jobs</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DataSection