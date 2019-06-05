import React from 'react';
import PropTypes from 'prop-types';

import RelativePost from '../RelativePost';

function RelativePosts({ postNodes }) {
  const postNodesNotNull = postNodes.filter(x => x);

  if (postNodesNotNull.length === 0) {
    return null;
  }

  return (
    <>
      <hr />
      <div style={{ marginTop: '-1rem' }}>Relative Readings:</div>
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
