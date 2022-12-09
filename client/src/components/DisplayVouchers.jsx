
const DisplayVouchers = () => {
    const VoucherCount = 11;
    const countLow = {
        color: 'red',
    }

    const High = () => {
        return <b>{VoucherCount}</b>;
    }

    const Low = () => {
        return <b style={countLow}>{VoucherCount}</b>
    }

    function ShowCount(VoucherCount) {
        if (VoucherCount <= 10) {
            return <Low/>;
        }
        return <High/>;
    }

    return (
        <div>
            <h1>Display Vouchers</h1>
            <h4>Vouchers Remaining: {ShowCount(VoucherCount)}</h4>
        </div>
    );
};

export default DisplayVouchers;