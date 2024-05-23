using System;
using System.Collections.Generic;

namespace TiendaOnline.Server.Models;

public partial class User
{
    public int Idusers { get; set; }

    public string Name { get; set; } = null!;

    public string Lastname { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string Address { get; set; } = null!;

    public string Phone { get; set; } = null!;

    public virtual ICollection<Comentario> Comentarios { get; set; } = new List<Comentario>();

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();

    public virtual ICollection<Pagoinfo> Pagoinfos { get; set; } = new List<Pagoinfo>();

    public virtual ICollection<Product> Products { get; set; } = new List<Product>([]);

    public virtual ICollection<Wishlist> Wishlists { get; set; } = new List<Wishlist>();
}
