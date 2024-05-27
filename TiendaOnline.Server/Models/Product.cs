using System;
using System.Collections.Generic;

namespace TiendaOnline.Server.Models;

public partial class Product
{
    public int Idproducts { get; set; }

    public string Name { get; set; } = null!;

    public string? Description { get; set; }

    public decimal UnitPrice { get; set; }

    public int? Stock { get; set; }
    public string Fileroute { get; set; }

    public int Idusers { get; set; }

    public int Idcategories { get; set; }

    public virtual Category IdcategoriesNavigation { get; set; } = null!;

    public virtual User IdusersNavigation { get; set; } = null!;
}
