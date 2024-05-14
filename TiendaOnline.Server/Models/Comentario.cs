using System;
using System.Collections.Generic;

namespace TiendaOnline.Server.Models;

public partial class Comentario
{
    public int Idcomentarios { get; set; }

    public int Rate { get; set; }

    public string Comentario1 { get; set; } = null!;

    public int Idproducts { get; set; }

    public int Idusers { get; set; }

    public virtual User IdusersNavigation { get; set; } = null!;
}
