import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmitButton = async (e) => {
        e.preventDefault();

        try{
            const response = await fetch(`usuarios/getuserbycredentials?email=${email}&password=${password}`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (response.ok){
                const user = await response.json();
                localStorage.setItem('user', JSON.stringify(user));
                navigate("/");
            }else{
                alert("Correo o contrasenia incorrectos");
            }
        }catch (e) {
            console.log(e);
        }
    }

    return (
        <div className="d-flex vh-100 justify-content-center align-items-center bg-primary" >
            <div className="p-3 border border-primary rounded bg-white w-50 bg-opacity-50">
                <div className="d-flex justify-content-center">
                <h1>Iniciar Sesion</h1>
                </div>
                <form onSubmit={handleSubmitButton}>
                    <div className="mb-3 input-group">
                        <span className="input-group-text" htmlFor="email">Correo electronico</span>
                        <input
                            type="email"
                            placeholder="Ingresa tu correo electronico"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></input>
                    </div>
                    <div className="mb-3 input-group">
                        <span className="input-group-text" htmlFor="password">Contrasenia</span>
                        <input
                            type="passsword"
                            placeholder="Introduce tu contrasenia"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        ></input>
                    </div>
                    <div className="d-flex justify-content-around">
                        <button type="submit" className="btn btn-success me-2">Inicia Sesion</button>
                        <button type="button" className="btn btn-warning" onClick={() => navigate("/register")}>Registrate</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;