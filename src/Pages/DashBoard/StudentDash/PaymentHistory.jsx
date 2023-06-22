import React, { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "react-query";

const PaymentHistory = () => {
  const { user } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();

  const { data: paymentHistory = [] } = useQuery(
    [`paidClasses/${user?.email}`],
    async () => {
      const res = await axiosSecure.get(`/paidClasses/${user?.email}`);
      return res.data;
    }
  );
    console.log(paymentHistory);
    // TODO: need to format date
  return (
    <div>
      <div className="overflow-x-auto border border-cyan-800 rounded-xl">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Student Email</th>
              <th>Class Name</th>
              <th>Paid Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {paymentHistory?.map((payment, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{payment.studentEmail}</td>
                  <td>{payment.class}</td>
                  <td>${payment.price}</td>
                  <td>{payment.date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
