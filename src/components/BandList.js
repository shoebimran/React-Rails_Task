import React from 'react';
import './BandList.css';

const BandList = ({ bands }) => (
  <div className="band-list-container">
    {bands.length > 0 ? (
      bands.map((band, index) => (
        <div className="band-card" key={index}>
          <h3 className="band-name">{band.name}</h3>
          <p className="band-year">Founded: {band.founded_year || 'Unknown'}</p>
        </div>
      ))
    ) : (
      <p className="no-bands">No bands found.</p>
    )}
  </div>
);

export default BandList;
