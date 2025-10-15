import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Button from "../components/Button";

/**
 * EnquiryPage - lets user review items (from cart) and send an enquiry email.
 * We reuse cart items; pricing for Rugs stays hidden per business rule.
 */
const EnquiryPage = () => {
  const { items, subtotal } = useCart();
  const navigate = useNavigate();
  const [notes, setNotes] = useState("");
  const [sending, setSending] = useState(false);

  const hasRugs = useMemo(
    () => items.some((i) => (i.category || "").toLowerCase() === "rugs"),
    [items]
  );

  const buildMailto = () => {
    if (!items.length) return "mailto:info@indikaara.com";
    const subject = encodeURIComponent("Product Enquiry - Indikaara");
    const lines = items.map((item, idx) => {
      console.log("item", item);
      return `${idx + 1}. ${item.title} | Category: ${
        item.category || "N/A"
      } | Size: ${item.dimensions || "N/A"} | Qty: ${
        item.quantity
      } | Product ID : ${item.id} `;
    });
    const totalLine = hasRugs ? `` : `Subtotal: ${subtotal}`;
    const userNotes = notes.trim()
      ? `\n\nCustomer Notes:\n${notes.trim()}`
      : "";
    const body = encodeURIComponent(
      lines.join("\n") +
        "\n" +
        totalLine +
        userNotes +
        "\n\nPlease provide pricing (if rug), shipping, lead time and payment instructions."
    );
    return `mailto:info@indikaara.com?subject=${subject}&body=${body}`;
  };

  const handleSend = (e) => {
    e.preventDefault();
    setSending(true);
    // Open mail client
    const link = document.createElement("a");
    link.href = buildMailto();
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => setSending(false), 800);
  };

  if (!items.length) {
    return (
      <main className="container mx-auto max-w-4xl px-4 py-24 my-20 text-center">
        <h1 className="text-3xl font-bold text-primary mb-4">Enquiry</h1>
        <p className="text-text-secondary mb-8">
          Your cart is empty. Add items before creating an enquiry.
        </p>
        <Link to="/catalogue">
          <Button variant="primary">Browse Products</Button>
        </Link>
      </main>
    );
  }

  return (
    <main className="container mx-auto max-w-5xl px-4 py-8 my-20 pt-24">
      {/* Breadcrumb */}
      <nav className="mb-8" aria-label="Breadcrumb">
        <div className="flex items-center gap-2 text-sm text-text-secondary">
          <Link to="/" className="text-primary hover:underline">
            Home
          </Link>
          <span>/</span>
          <Link to="/cart" className="text-primary hover:underline">
            Cart
          </Link>
          <span>/</span>
          <span className="text-primary font-medium">Enquiry</span>
        </div>
      </nav>

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-primary mb-2">Enquiry Review</h1>
        <p className="text-text-secondary">
          Review your selected items and add any notes before sending your
          enquiry.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2">
          <div className="bg-card-bg border border-border-color rounded-xl p-6 space-y-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="pb-6 border-b border-border-color last:border-b-0 last:pb-0"
              >
                <div className="flex gap-4">
                  <div
                    className="w-24 h-24 bg-cover bg-center rounded-lg flex-shrink-0"
                    style={{ backgroundImage: `url(${item.image})` }}
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-primary font-semibold text-lg leading-tight mb-1">
                      {item.title}
                    </h3>
                    <p className="text-text-secondary text-xs mb-2">
                      {item.category || "Handcrafted Item"}
                    </p>
                    <div className="flex flex-wrap gap-3 text-[11px] text-text-secondary mb-2">
                      {item.dimensions && (
                        <span className="bg-background/40 px-2 py-1 rounded-md border border-border-color">
                          Size:{" "}
                          <span className="text-accent">{item.dimensions}</span>
                        </span>
                      )}
                      {item.color && item.color !== "Standard" && (
                        <span className="bg-background/40 px-2 py-1 rounded-md border border-border-color">
                          Color:{" "}
                          <span className="text-accent">{item.color}</span>
                        </span>
                      )}
                      {item.material && item.material !== "Handcrafted" && (
                        <span className="bg-background/40 px-2 py-1 rounded-md border border-border-color">
                          Material:{" "}
                          <span className="text-accent">{item.material}</span>
                        </span>
                      )}
                      <span className="bg-background/40 px-2 py-1 rounded-md border border-border-color">
                        Qty:{" "}
                        <span className="text-accent">{item.quantity}</span>
                      </span>
                    </div>
                    <p className="text-primary font-medium text-sm">
                      {(item.category || "").toLowerCase() === "rugs" ? (
                        <span className="text-text-secondary italic">
                          Price on enquiry
                        </span>
                      ) : (
                        <span>{item.price}</span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary / Form */}
        <div className="lg:col-span-1">
          <div className="bg-card-bg border border-border-color rounded-xl p-6 sticky top-8">
            <h2 className="text-xl font-bold text-primary mb-4">
              Send Enquiry
            </h2>
            {hasRugs && (
              <div className="mb-4 text-[11px] leading-relaxed text-text-secondary bg-background/60 border border-border-color rounded-md p-3">
                Rug pricing will be confirmed in our reply. Non-rug items (if
                any) show indicative values.
              </div>
            )}
            <form onSubmit={handleSend} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-text-secondary uppercase tracking-wider mb-1">
                  Additional Notes (optional)
                </label>
                <textarea
                  className="w-full h-28 resize-none bg-background/40 border border-border-color rounded-md p-3 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-accent/40"
                  placeholder="Share intended usage, interior style, delivery city, timeline, etc."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
              <div className="space-y-2 text-[11px] text-text-secondary/80">
                <p>
                  Clicking Send opens your email client with a pre-filled
                  enquiry. You can review & send from there.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <Button
                  type="submit"
                  variant="secondary"
                  size="lg"
                  disabled={sending}
                >
                  {sending ? "Preparing…" : "Send Enquiry Email"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={() => navigate("/cart")}
                >
                  Back to Cart
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default EnquiryPage;
