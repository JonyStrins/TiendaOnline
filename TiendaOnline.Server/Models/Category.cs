using System;
using System.Collections.Generic;

namespace TiendaOnline.Server.Models;

public partial class Category
{
    public int Idcategories { get; set; }

    public string Name { get; set; } = null!;

    public string? Description { get; set; }

    public virtual ICollection<Product> Products { get; set; } = new List<Product>();
}
