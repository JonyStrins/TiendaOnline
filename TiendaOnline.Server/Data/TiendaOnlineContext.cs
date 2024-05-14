using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using TiendaOnline.Server.Models;

namespace TiendaOnline.Server.Data;

public partial class TiendaOnlineContext : DbContext
{
    public TiendaOnlineContext(DbContextOptions<TiendaOnlineContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Category> Categories { get; set; }

    public virtual DbSet<Comentario> Comentarios { get; set; }

    public virtual DbSet<Envio> Envios { get; set; }

    public virtual DbSet<Multimedium> Multimedia { get; set; }

    public virtual DbSet<Order> Orders { get; set; }

    public virtual DbSet<Orderdetail> Orderdetails { get; set; }

    public virtual DbSet<Pago> Pagos { get; set; }

    public virtual DbSet<Pagoinfo> Pagoinfos { get; set; }

    public virtual DbSet<Product> Products { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<Wishlist> Wishlists { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasKey(e => e.Idcategories).HasName("PRIMARY");

            entity.ToTable("categories");

            entity.Property(e => e.Idcategories).HasColumnName("idcategories");
            entity.Property(e => e.Description)
                .HasColumnType("text")
                .HasColumnName("description");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .HasColumnName("name");
        });

        modelBuilder.Entity<Comentario>(entity =>
        {
            entity.HasKey(e => e.Idcomentarios).HasName("PRIMARY");

            entity.ToTable("comentarios");

            entity.HasIndex(e => e.Idproducts, "fkComentariosProducts");

            entity.HasIndex(e => e.Idusers, "fkComentariosUsers");

            entity.Property(e => e.Idcomentarios).HasColumnName("idcomentarios");
            entity.Property(e => e.Comentario1)
                .HasColumnType("text")
                .HasColumnName("comentario");
            entity.Property(e => e.Idproducts).HasColumnName("idproducts");
            entity.Property(e => e.Idusers).HasColumnName("idusers");
            entity.Property(e => e.Rate).HasColumnName("rate");

            entity.HasOne(d => d.IdusersNavigation).WithMany(p => p.Comentarios)
                .HasForeignKey(d => d.Idusers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fkComentariosUsers");
        });

        modelBuilder.Entity<Envio>(entity =>
        {
            entity.HasKey(e => e.Idenvios).HasName("PRIMARY");

            entity.ToTable("envios");

            entity.HasIndex(e => e.Idorders, "fkEnviosOrders");

            entity.Property(e => e.Idenvios).HasColumnName("idenvios");
            entity.Property(e => e.Address)
                .HasMaxLength(255)
                .HasColumnName("address");
            entity.Property(e => e.EstadoEnvio)
                .HasColumnType("enum('enviado','proceso','entregado')")
                .HasColumnName("estadoEnvio");
            entity.Property(e => e.FechaEstimadaEntrega)
                .HasColumnType("date")
                .HasColumnName("fechaEstimadaEntrega");
            entity.Property(e => e.Idorders).HasColumnName("idorders");
            entity.Property(e => e.MetodoEnvio)
                .HasMaxLength(100)
                .HasColumnName("metodoEnvio");

            entity.HasOne(d => d.IdordersNavigation).WithMany(p => p.Envios)
                .HasForeignKey(d => d.Idorders)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fkEnviosOrders");
        });

        modelBuilder.Entity<Multimedium>(entity =>
        {
            entity.HasKey(e => e.Idmultimedia).HasName("PRIMARY");

            entity.ToTable("multimedia");

            entity.HasIndex(e => e.Idproducts, "fkMultimedia");

            entity.Property(e => e.Idmultimedia).HasColumnName("idmultimedia");
            entity.Property(e => e.Fileroute)
                .HasMaxLength(100)
                .HasColumnName("fileroute");
            entity.Property(e => e.Idproducts).HasColumnName("idproducts");
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .HasColumnName("name");
        });

        modelBuilder.Entity<Order>(entity =>
        {
            entity.HasKey(e => e.Idorders).HasName("PRIMARY");

            entity.ToTable("orders");

            entity.HasIndex(e => e.Idusers, "fkUsuarioOrders");

            entity.Property(e => e.Idorders).HasColumnName("idorders");
            entity.Property(e => e.FechaPedido)
                .HasColumnType("datetime")
                .HasColumnName("fechaPedido");
            entity.Property(e => e.Idusers).HasColumnName("idusers");
            entity.Property(e => e.State)
                .HasColumnType("enum('pendiente','procesando','enviado','entregado','cancelado')")
                .HasColumnName("state");

            entity.HasOne(d => d.IdusersNavigation).WithMany(p => p.Orders)
                .HasForeignKey(d => d.Idusers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fkUsuarioOrders");
        });

        modelBuilder.Entity<Orderdetail>(entity =>
        {
            entity.HasKey(e => e.IdorderDetails).HasName("PRIMARY");

            entity.ToTable("orderdetails");

            entity.HasIndex(e => e.Idorders, "fkOrderDetailsOrders");

            entity.HasIndex(e => e.Idproducts, "fkOrderDetailsProducts");

            entity.Property(e => e.IdorderDetails).HasColumnName("idorderDetails");
            entity.Property(e => e.Cantidad).HasColumnName("cantidad");
            entity.Property(e => e.Idorders).HasColumnName("idorders");
            entity.Property(e => e.Idproducts).HasColumnName("idproducts");
            entity.Property(e => e.UnitPrice)
                .HasPrecision(10)
                .HasColumnName("unitPrice");

            entity.HasOne(d => d.IdordersNavigation).WithMany(p => p.Orderdetails)
                .HasForeignKey(d => d.Idorders)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fkOrderDetailsOrders");
        });

        modelBuilder.Entity<Pago>(entity =>
        {
            entity.HasKey(e => e.Idpagos).HasName("PRIMARY");

            entity.ToTable("pagos");

            entity.HasIndex(e => e.Idorders, "fkPagoOrders");

            entity.HasIndex(e => e.IdpagoInfo, "fkPagoPagoInfo");

            entity.Property(e => e.Idpagos).HasColumnName("idpagos");
            entity.Property(e => e.FechaPago)
                .HasColumnType("datetime")
                .HasColumnName("fechaPago");
            entity.Property(e => e.Idorders).HasColumnName("idorders");
            entity.Property(e => e.IdpagoInfo).HasColumnName("idpagoInfo");
            entity.Property(e => e.Monto)
                .HasPrecision(10)
                .HasColumnName("monto");

            entity.HasOne(d => d.IdordersNavigation).WithMany(p => p.Pagos)
                .HasForeignKey(d => d.Idorders)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fkPagoOrders");

            entity.HasOne(d => d.IdpagoInfoNavigation).WithMany(p => p.Pagos)
                .HasForeignKey(d => d.IdpagoInfo)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fkPagoPagoInfo");
        });

        modelBuilder.Entity<Pagoinfo>(entity =>
        {
            entity.HasKey(e => e.IdpagoInfo).HasName("PRIMARY");

            entity.ToTable("pagoinfo");

            entity.HasIndex(e => e.UsersIdusers, "fkPagoInfoUsuarios");

            entity.Property(e => e.IdpagoInfo).HasColumnName("idpagoInfo");
            entity.Property(e => e.Cvv)
                .HasMaxLength(4)
                .HasColumnName("cvv");
            entity.Property(e => e.Detalles)
                .HasColumnType("text")
                .HasColumnName("detalles");
            entity.Property(e => e.FechaExpiracion)
                .HasMaxLength(7)
                .HasColumnName("fechaExpiracion");
            entity.Property(e => e.NombreTitular)
                .HasMaxLength(255)
                .HasColumnName("nombreTitular");
            entity.Property(e => e.Numero)
                .HasMaxLength(16)
                .HasColumnName("numero");
            entity.Property(e => e.Tipo)
                .HasColumnType("enum('Tarjeta Credito','Tarjeta Debito')")
                .HasColumnName("tipo");
            entity.Property(e => e.UsersIdusers).HasColumnName("users_idusers");

            entity.HasOne(d => d.UsersIdusersNavigation).WithMany(p => p.Pagoinfos)
                .HasForeignKey(d => d.UsersIdusers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fkPagoInfoUsuarios");
        });

        modelBuilder.Entity<Product>(entity =>
        {
            entity.HasKey(e => new { e.Idproducts, e.Idusers, e.Idcategories }).HasName("PRIMARY");

            entity.ToTable("products");

            entity.HasIndex(e => e.Idcategories, "fkCategoria");

            entity.HasIndex(e => e.Idusers, "fkUsuario");

            entity.Property(e => e.Idproducts)
                .ValueGeneratedOnAdd()
                .HasColumnName("idproducts");
            entity.Property(e => e.Idusers).HasColumnName("idusers");
            entity.Property(e => e.Idcategories).HasColumnName("idcategories");
            entity.Property(e => e.Description)
                .HasColumnType("text")
                .HasColumnName("description");
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .HasColumnName("name");
            entity.Property(e => e.Stock).HasColumnName("stock");
            entity.Property(e => e.UnitPrice)
                .HasPrecision(10)
                .HasColumnName("unitPrice");

            entity.HasOne(d => d.IdcategoriesNavigation).WithMany(p => p.Products)
                .HasForeignKey(d => d.Idcategories)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fkCategoria");

            entity.HasOne(d => d.IdusersNavigation).WithMany(p => p.Products)
                .HasForeignKey(d => d.Idusers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fkUsuario");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Idusers).HasName("PRIMARY");

            entity.ToTable("users");

            entity.Property(e => e.Idusers).HasColumnName("idusers");
            entity.Property(e => e.Address)
                .HasMaxLength(255)
                .HasColumnName("address");
            entity.Property(e => e.Email)
                .HasMaxLength(245)
                .HasColumnName("email");
            entity.Property(e => e.Lastname)
                .HasMaxLength(100)
                .HasColumnName("lastname");
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .HasColumnName("name");
            entity.Property(e => e.Password)
                .HasMaxLength(10)
                .HasColumnName("password");
            entity.Property(e => e.Phone)
                .HasMaxLength(10)
                .HasColumnName("phone");
        });

        modelBuilder.Entity<Wishlist>(entity =>
        {
            entity.HasKey(e => e.Idwishlist).HasName("PRIMARY");

            entity.ToTable("wishlist");

            entity.HasIndex(e => e.Idproducts, "fkWishlistProducts");

            entity.HasIndex(e => e.Idusers, "fkWishlistUsers");

            entity.Property(e => e.Idwishlist).HasColumnName("idwishlist");
            entity.Property(e => e.FechaAgregado)
                .HasColumnType("datetime")
                .HasColumnName("fechaAgregado");
            entity.Property(e => e.Idproducts).HasColumnName("idproducts");
            entity.Property(e => e.Idusers).HasColumnName("idusers");

            entity.HasOne(d => d.IdusersNavigation).WithMany(p => p.Wishlists)
                .HasForeignKey(d => d.Idusers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fkWishlistUsers");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
