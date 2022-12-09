import React, { useState, useEffect } from 'react';

const VoucherCount = 5;
const countLow = {
  color: 'red',
};

const DisplayVouchers = () => {
  const [seconds, setSeconds] = useState(10);

  useEffect(() => {
    const time = seconds > 0 && setInterval(() => setSeconds(seconds - 1), 1000);
    return () => clearInterval(time);
  }, [seconds]);

  const High = () => {
    return <b>{VoucherCount}</b>;
  };
  
  const Low = (seconds) => {
    if (seconds % 2 === 0) {
      return <b style={countLow}>{VoucherCount}</b>;
    }
    else if (seconds % 2 === 1) {
      return <b>{VoucherCount}</b>;
    }
  };
  
  function ShowCount(VoucherCount) {
    if (VoucherCount <= 10) {
      return Low(seconds);
    }
    return <High/>;
  };  

  return (
    <div>
      <h4>Available Vouchers: {ShowCount(VoucherCount)}</h4>
    </div>
  );
};

export default DisplayVouchers;
