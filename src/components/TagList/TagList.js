import './TagList.css';

import React from 'react';
import PropTypes from 'prop-types';

import Tag from '../Tag';

function TagList({ tags, baseUrl }) {
  return (
    <ul className="tag-ul">
      {tags.map(text => (
        <li key={text}>
          <Tag text={text} url={`${baseUrl}/${text}`} />
        </li>
      ))}
    </ul>
  );
}

TagList.propTypes = {
  tags: PropTypes.array.isRequired,
};

export default TagList;
