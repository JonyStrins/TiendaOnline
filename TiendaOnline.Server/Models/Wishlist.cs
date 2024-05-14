using System;
using System.Collections.Generic;

namespace TiendaOnline.Server.Models;

public partial class Wishlist
{
    public int Idwishlist { get; set; }

    public DateTime FechaAgregado { get; set; }

    public int Idusers { get; set; }

    public int Idproducts { get; set; }

    public virtual User IdusersNavigation { get; set; } = null!;
}
