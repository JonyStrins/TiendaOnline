using System;
using System.Collections.Generic;

namespace TiendaOnline.Server.Models;

public partial class Envio
{
    public int Idenvios { get; set; }

    public string Address { get; set; } = null!;

    public string MetodoEnvio { get; set; } = null!;

    public string? EstadoEnvio { get; set; }

    public DateTime FechaEstimadaEntrega { get; set; }

    public int Idorders { get; set; }

    public virtual Order IdordersNavigation { get; set; } = null!;
}
