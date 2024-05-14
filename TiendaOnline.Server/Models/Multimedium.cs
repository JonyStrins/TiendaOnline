using System;
using System.Collections.Generic;

namespace TiendaOnline.Server.Models;

public partial class Multimedium
{
    public int Idmultimedia { get; set; }

    public string? Name { get; set; }

    public string Fileroute { get; set; } = null!;

    public int Idproducts { get; set; }
}
