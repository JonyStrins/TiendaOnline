using System;
using System.Collections.Generic;

namespace TiendaOnline.Server.Models;

public partial class Order
{
    public int Idorders { get; set; }

    public DateTime FechaPedido { get; set; }

    public string? State { get; set; }

    public int Idusers { get; set; }

    public virtual ICollection<Envio> Envios { get; set; } = new List<Envio>();

    public virtual User IdusersNavigation { get; set; } = null!;

    public virtual ICollection<Orderdetail> Orderdetails { get; set; } = new List<Orderdetail>();

    public virtual ICollection<Pago> Pagos { get; set; } = new List<Pago>();
}
