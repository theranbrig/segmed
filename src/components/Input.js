import React from 'react';

const Input = ({ searchText, filteredReports, searchReports }) => (
  <div className='flex flex-col items-center mb-12'>
    <input
      className='border border-black rounded-full px-4'
      type='text'
      onChange={(e) => searchReports(e.target.value)}
      value={searchText}
    />
    {searchText.length ? (
      <p className='inline'>
        {filteredReports.length} report{filteredReports.length === 1 ? '' : 's'} found for "
        {searchText}"
      </p>
    ) : (
      <p className='inline'>Search Reports</p>
    )}
  </div>
);

export default Input;
