using System;
using System.Collections.Generic;

namespace TiendaOnline.Server.Models;

public partial class Pago
{
    public int Idpagos { get; set; }

    public decimal Monto { get; set; }

    public DateTime FechaPago { get; set; }

    public int Idorders { get; set; }

    public int IdpagoInfo { get; set; }

    public virtual Order IdordersNavigation { get; set; } = null!;

    public virtual Pagoinfo IdpagoInfoNavigation { get; set; } = null!;
}
