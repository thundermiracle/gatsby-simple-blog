import React from 'react';
import PropTypes from 'prop-types';

import { formatMessage } from 'utils/i18n';
import RelativePost from '../RelativePost';

function RelativePosts({ postNodes, lang }) {
  const postNodesNotNull = postNodes.filter(x => x);

  if (postNodesNotNull.length === 0) {
    return null;
  }

  return (
    <>
      <hr />
      <div style={{ marginTop: '-1rem' }}>{formatMessage('tRelativePosts')}:</div>
      {postNodesNotNull.map(postNode => (
        <RelativePost lang={lang} key={postNode.fields.slug} postNode={postNode} />
      ))}
    </>
  );
}

RelativePosts.propTypes = {
  postNodes: PropTypes.array,
  lang: PropTypes.string,
};

RelativePosts.defaultProps = {
  postNodes: [],
  lang: '',
};

export default RelativePosts;
