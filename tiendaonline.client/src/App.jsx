import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

function App() {
    const [users, setUsers] = useState([]);
    const [username, setUsername] = useState();
    const [lastname, setLastname] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [address, setAddress] = useState();
    const [phone, setPhone] = useState();

    useEffect(() => {
        obtenerUsuarios();
    }, []);

    const eliminarUsuario = async (id) => {
        const response = await fetch("usuarios/deleteuser/" + id, {
            method: "DELETE"
        })

        if (response.ok) {
            await obtenerUsuarios();
        }
    }

    const agregarUsuario = async (e) => {
        e.preventDefault()

        const response = await fetch("usuarios/adduser", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8' 
            },
            body: JSON.stringify({
                name: username,
                lastname: lastname,
                email: email,
                password: password,
                address: address,
                phone: phone
            })
        })

        if (response.ok) {
            setUsername("");
            setLastname("");
            setEmail("");
            setPassword("");
            setAddress("");
            setPhone("");

            await obtenerUsuarios();
        }
    }

    async function obtenerUsuarios() {
        const response = await fetch('usuarios/getusers');
        const data = await response.json();
        setUsers(data);
    }

    const contents = users === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : <table className="table table-striped" aria-labelledby="tabelLabel">
            <thead>
                <tr>
                    <th className="table-title">Nombre</th>
                    <th className="table-title">Apellido</th>
                    <th className="table-title">Email</th>
                    <th className="table-title">Password</th>
                    <th className="table-title">Address</th>
                    <th className="table-title">Phone</th>
                    <th className="table-title">Accion</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map(
                        (user) =>
                            <tr key={user.idusers}>
                        <td>{user.name}</td>
                        <td>{user.lastname}</td>
                        <td>{user.email}</td>
                        <td>{user.password}</td>
                        <td>{user.address}</td>
                        <td>{user.phone}</td>
                                <td><button type="button" className="btn btn-danger" onClick={() => eliminarUsuario(user.idusers) }>Eliminar</button></td>
                    </tr>
                    )
                }
            </tbody>
        </table>;

    return (
        <div className="container d-flex flex-column align-items-center">
            <h1 id="tabelLabel">Usuarios</h1>
            {contents}
            <form onSubmit={ agregarUsuario }>
                <div className="input-group mb-3">
                    <input
                        type="text"
                        id="username"
                        className="form-control"
                        placeholder="Name"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        />
                    <input
                        type="text"
                        className="form-control"
                        id="lastname"
                        placeholder="LastName"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                        aria-label="LastName" />
                </div>
                <input
                    type="email"
                    className="form-control mb-3"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address" />
                <input
                    type="password"
                    id="userpassword"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control mb-3"
                    placeholder="Password" />
                <input
                    type="text"
                    className="form-control mb-3"
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Address" />
                <input
                    type="text"
                    className="form-control mb-3"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone" />
                <input className="btn btn-primary" type="submit" value="Agregar"/>
            </form>
        </div>
    );
    
}

export default App;