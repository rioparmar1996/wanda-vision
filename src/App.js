import React, { Component } from "react";
import { getPatients } from "./services";

class App extends Component {
  state = {
    patients: [],
  };

  componentDidMount() {
    getPatients().then((res) => {
      this.setState({ patients: this.flattenpatientObj(res) });
      console.log(res);
      //console.log(this.state.patients);
    });
  }

  flattenpatientObj = (response) => {
    return (response.data.entry || []).map((item) => {
      const name = item.resource.name || [];
      return {
        id: item.resource.id,
        name: `${((name[0] || {}).given || []).join(" ")} ${
          (name[0] || {}).family
        }`,
        gender: item.resource.gender,
        dob: item.resource.birthDate,
        photo:
          "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png",
      };
    });
  };

  render() {
    const { patients } = this.state;
    return (
      <table>
        <thead>
          <tr>
            <th>Profile Image</th>
            <th>Full Name</th>
            <th>Gender</th>
            <th>Date of Birth</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.id}>
              <td>
                <img
                  src={patient.photo}
                  alt="Avatar"
                  style={{ height: 50, width: 50, borderRadius: "50%" }}
                />
              </td>
              <td>{patient.name}</td>
              <td>{patient.gender}</td>
              <td>{patient.dob}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default App;
