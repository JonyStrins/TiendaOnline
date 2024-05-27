import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {

    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [lastname, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [passwordValidate, setPasswordValidate] = useState('');
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')


    const handleSubmitButton = async (e) => {
        e.preventDefault();

        if (passwordValidate === password) {
            try {
                const response = await fetch("usuarios/adduser", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        Name: name || "",
                        Lastname: lastname || "",
                        Email: email ||"",
                        Password: password ||"",
                        Address: address ||"",
                        Phone: phone ||""
                    })
                });

                if (response.ok){
                    navigate("/login");
                }

            } catch (e) {
                console.log(e);
            }
        } else {
            alert("Las Contraseñas no coinciden");
        }
    }

    return (
        <div className="d-flex vh-100 justify-content-center align-items-center bg-primary">
            <div className="p-3 border border-primary rounded bg-white w-50 bg-opacity-50">
                <div className="d-flex justify-content-center">
                    <h1>Registrarse</h1>
                </div>
                <form onSubmit={handleSubmitButton}>
                    <div className="input-group mb-3">
                        <span className="input-group-text" htmlFor="name">Nombre:</span>
                        <input
                            type="text"
                            placeholder="Ex. Rigoberto"
                            className="form-control"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="input-group mb-3">
                        <span className="input-group-text" htmlFor="lastname">Apellido:</span>
                        <input
                            type="text"
                            placeholder="Ex. Perez"
                            className="form-control"
                            required
                            value={lastname}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                    <div className=" input-group mb-3">
                        <span className="input-group-text" htmlFor="email">Correo electronico:</span>
                        <input
                            type="email"
                            placeholder="Ex. perez.rigo@example.com"
                            className="form-control"
                            value={email}
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text" htmlFor="password">Contrasenia:</span>
                        <input
                            type="password"
                            placeholder="Introduce tu contrasenia"
                            className="form-control"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text" htmlFor="password">Verificar Contrasenia:</span>
                        <input
                            type="password"
                            placeholder="Introduce tu contrasenia una vez mas"
                            className="form-control"
                            required
                            value={passwordValidate}
                            onChange={(e) => setPasswordValidate(e.target.value)}
                        />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text" htmlFor="address">Direccion:</span>
                        <input
                            type="text-area"
                            placeholder="Ex. La Joyita #3"
                            className="form-control"
                            required
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text" htmlFor="phone">Telefono:</span>
                        <input
                            type="text"
                            placeholder="Ex. 4451234567"
                            className="form-control"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    <div className="d-flex justify-content-around">
                        <button type="submit" className="btn btn-secondary">Registrate</button>
                        <button type="button" className="btn btn-danger" onClick={() => navigate("/login")}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;