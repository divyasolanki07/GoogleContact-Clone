import React from 'react';

const COLORS = ['#1a73e8', '#ea4335', '#34a853', '#fbbc04', '#ab47bc', '#ef6c00', '#00838f', '#c62828', '#2e7d32', '#1565c0'];

export const colorFor = (name) => {
  if (!name) return COLORS[0];
  return COLORS[(name.charCodeAt(0) + (name.charCodeAt(1) || 0)) % COLORS.length];
};

export const initials = (c) => (c.first[0] + (c.last ? c.last[0] : '')).toUpperCase();

const Avatar = ({ contact, size = 40, fontSize }) => (
  <div
    className="avatar"
    style={{
      width: size,
      height: size,
      background: colorFor(contact.first),
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Google Sans', sans-serif",
      fontWeight: 500,
      color: 'white',
      fontSize: fontSize || size * 0.4,
      flexShrink: 0,
    }}
  >
    {initials(contact)}
  </div>
);

export default Avatar;
