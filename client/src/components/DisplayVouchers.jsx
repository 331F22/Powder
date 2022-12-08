const VoucherCount = 11;
const countLow = {
  color: 'red',
};

const High = () => {
  return <b>{VoucherCount}</b>;
};

const Low = () => {
  return <b style={countLow}>{VoucherCount}</b>
};

function ShowCount(VoucherCount) {
  if (VoucherCount <= 10) {
    return <Low/>;
  }
  return <High/>;
};

const DisplayVouchers = () => {

  return (
    <div class='editControls'>
      <h4>Vouchers Remaining: {ShowCount(VoucherCount)}</h4>
    </div>
  );
};

export default DisplayVouchers;
