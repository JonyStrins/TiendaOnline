import { useState } from "react";

function LoginPage() {

    
    const [name, setName] = useState('')
    const [lastname, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [passwordValidate, setPasswordValidate] = useState('');
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    

    return (
        <div className="d-flex vh-100 justify-content-center align-items-center bg-primary" style={{ backgroundImage: "url(../resourses/fondo1.png)" }}>
            <div className="p-3 border border-primary rounded bg-white w-50 bg-opacity-50">
                <div className="d-flex justify-content-center">
                    <h1>Registrarse</h1>
                </div>
                <form>
                        <div className="input-group mb-3">
                            <span className="input-group-text" htmlFor="name">Nombre:</span>
                            <input
                                type="text"
                                placeholder="Ex. Rigoberto"
                                className="form-control"
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
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text" htmlFor="password">Contrasenia:</span>
                        <input
                            type="password"
                            placeholder="Introduce tu contrasenia"
                            className="form-control"
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
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    <div className="d-flex justify-content-center">
                        <button type="button" className="btn btn-warning">Registrate</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;