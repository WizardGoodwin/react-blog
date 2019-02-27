import React from 'react';
import About from './About/About';
import LastPostsList from './LastPostsList/LastPostsList';
import LastUsersList from './LastUsersList/LastUsersList';


export default function Sidebar() {
  return (
    <div className="col-3">
      <LastPostsList />
      <About />
      <LastUsersList />
    </div>
  )
}