import React from 'react';
import PropTypes from 'prop-types';

import { useText } from '../../context/TextContext';
import RelativePost from '../RelativePost';

function RelativePosts({ postNodes }) {
  const postNodesNotNull = postNodes.filter(x => x);

  if (postNodesNotNull.length === 0) {
    return null;
  }

  const { tRelativePosts } = useText();

  return (
    <>
      <hr />
      <div style={{ marginTop: '-1rem' }}>{tRelativePosts}:</div>
      {postNodesNotNull.map(postNode => (
        <RelativePost key={postNode.fields.slug} postNode={postNode} />
      ))}
    </>
  );
}

RelativePosts.propTypes = {
  postNodes: PropTypes.array,
};

RelativePosts.defaultProps = {
  postNodes: [],
};

export default RelativePosts;
