import 'bootstrap/dist/css/bootstrap.min.css';
//'C:\Users\Eduardo LJ\Desktop\Web II\TiendaOnline\TiendaOnline.Server\Controllers\UsuariosController.cs'

function LoginPage() {
    /*
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    
    const saveSesion = async (e) => {
        e.preventDefault()

        const resoponse = await fetch("api/sesion/Guardar", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ email: email })
        })

        if (resoponse.ok) {
            setEmail("");
        }
    }
    */

    return (
        <div className="d-flex vh-100 justify-content-center align-items-center bg-primary" >
            <div className="p-3 border border-primary rounded bg-white w-25 bg-opacity-50">
                <form className="">
                    <div className="mb-3">
                        <label htmlFor="email">Correo electronico</label>
                        <input
                            type="email"
                            placeholder="Ingresa tu correo electronico"
                            className="form-control"
                            //value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></input>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password">Contrasenia</label>
                        <input
                            type="passsword"
                            placeholder="Introduce tu contrasenia"
                            className="form-control"
                            //value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        ></input>
                    </div>
                    <button type="submit" className="btn btn-success me-2">Inicia Sesion</button>
                    <button type="button" className="btn btn-warning">Registrate</button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;