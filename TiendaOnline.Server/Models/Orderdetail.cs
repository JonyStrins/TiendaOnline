using System;
using System.Collections.Generic;

namespace TiendaOnline.Server.Models;

public partial class Orderdetail
{
    public int IdorderDetails { get; set; }

    public int Cantidad { get; set; }

    public decimal UnitPrice { get; set; }

    public int Idproducts { get; set; }

    public int Idorders { get; set; }

    public virtual Order IdordersNavigation { get; set; } = null!;
}
