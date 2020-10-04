import React from 'react';

const Tag = ({ tag }) => {
  return (
    <p className={`${tag.background} inline-block rounded-lg py-1 px-2 m-1 text-gray-700`}>
      {tag.text}
    </p>
  );
};

export default Tag;
