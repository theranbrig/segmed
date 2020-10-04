import React from 'react';
import Tag from './Tag';

const StandardListItem = ({ report, idx }) => {
  return (
    <li
      className='grid grid-cols-report text-left py-3 border-t border-t-blue-300 items-start'
      key={report.id}
    >
      <span className='mr-4'>{idx + 1}. </span>
      <span>
        <span className='font-bold'>{report.title}</span> - {report.text}
      </span>
      <ul className='text-right'>
        {report.tags.length ? (
          report.tags.sort((a, b) => a.id - b.id).map((tag) => <Tag key={tag.id} tag={tag} />)
        ) : (
          <p className='text-center'> - </p>
        )}
      </ul>
    </li>
  );
};

export default StandardListItem;
