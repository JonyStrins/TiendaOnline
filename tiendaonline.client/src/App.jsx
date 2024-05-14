import { useEffect, useState } from 'react';
import './App.css';

function App() {
    const [users, setUsers] = useState();

    useEffect(() => {
        obtenerUsuarios();
    }, []);

    const contents = users === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : <table className="table table-striped" aria-labelledby="tabelLabel">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Address</th>
                    <th>Phone</th>
                </tr>
            </thead>
            <tbody>
                {users.map(user =>
                    <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.lastname}</td>
                        <td>{user.email}</td>
                        <td>{user.password}</td>
                        <td>{user.address}</td>
                        <td>{user.phone}</td>
                    </tr>
                )}
            </tbody>
        </table>;

    return (
        <div>
            <h1 id="tabelLabel">Weather forecast</h1>
            <p>This component demonstrates fetching data from the server.</p>
            {contents}
        </div>
    );
    
    async function obtenerUsuarios() {
        const response = await fetch('usuarios');
        const data = await response.json();
        setUsers(data);
    }
}

export default App;