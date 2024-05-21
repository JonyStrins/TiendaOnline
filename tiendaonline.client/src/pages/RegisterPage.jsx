import 'bootstrap/dist/css/bootstrap.min.css';
//'C:\Users\Eduardo LJ\Desktop\Web II\TiendaOnline\TiendaOnline.Server\Controllers\UsuariosController.cs'

function LoginPage() {

    /*
    const [name, setname] = useState('')
    const [lastname, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    */

    return (
        <div className="d-flex vh-100 justify-content-center align-items-center bg-primary">
            <div className="p-3 border border-primary rounded bg-white w-25 bg-opacity-50">
                <form>
                    <div className="mb-3">
                        <label htmlFor="name">Nombre</label>
                        <input
                            type="text"
                            placeholder="Ex. Rigoberto"
                            className="form-control"
                            //value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></input>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="lastname">Apellido</label>
                        <input
                            type="text"
                            placeholder="Ex. Perez"
                            className="form-control"
                            //value={lastname}
                            onChange={(e) => setLastName(e.target.value)}
                        ></input>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email">Correo electronico</label>
                        <input
                            type="email"
                            placeholder="Ex. perez.rigo@example.com"
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
                    <div className="mb-3">
                        <label htmlFor="address">Direccion</label>
                        <input
                            type="text-area"
                            placeholder="Ex. La Joyita #3"
                            className="form-control"
                            //value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        ></input>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phone">Numero de Telefono</label>
                        <input
                            type="text"
                            placeholder="Ex. 4451234567"
                            className="form-control"
                            //value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        ></input>
                    </div>
                    <button type="button" className="btn btn-warning">Registrate</button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;