import React from 'react';

class LastPostsList extends React.Component {
  render() {
    return (
      <div className="card mt-4">
        <div className="card-header text-info">Last posts</div>
        <ul className="list-group list-group-flush" />
      </div>
    );
  }
}

export default LastPostsList;
