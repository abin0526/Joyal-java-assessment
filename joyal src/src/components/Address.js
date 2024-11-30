import React, { useEffect, useState } from "react";
import axios from "axios";
import './Address.css';

function Address() {
  const [addresses, setAddresses] = useState([]);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");


  useEffect(() => {
    fetchAddresses();
  }, []);


  function fetchAddresses() {
    axios.get("http://localhost:8080/api/address").then((res) => {
      setAddresses(res.data);
    });
  }

  function addAddress() {
    const newAddress = { name, phoneno: phoneNumber, email, address };
    axios.post("http://localhost:8080/api/address", newAddress).then((res) => {
      setAddresses([...addresses, res.data]);
      setName(""); 
      setPhoneNumber("");
      setEmail("");
      setAddress("");
    });
  }

  return (
    <div>
      <h1>Details of Addresses</h1>
      <div>
        <input
          type="text"
          value={name}
          placeholder="Enter name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={phoneNumber}
          placeholder="Enter phone number"
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <input
          type="email"
          value={email}
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          value={address}
          placeholder="Enter address"
          onChange={(e) => setAddress(e.target.value)}
        />
        <button onClick={addAddress}>Save</button>
      </div>
  
     
      <div className="address-card-container">
        {addresses.map((address) => (
          <div key={address.id} className="address-card">
            <p>id: {address.id}</p>
            <h2>Name: {address.name}</h2>
            <p>Phone Number: {address.phoneno}</p>
            <p>Email: {address.email}</p>
            <p>Address: {address.address}</p>
          </div>
        ))}
      </div>
    </div>
  );
  
}

export default Address;