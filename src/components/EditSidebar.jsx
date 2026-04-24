import { useState, useEffect } from "react";
import ItemList from "../components/ItemList";

const EditSidebar = ({
  openEditPage,
  setOpenEditPage,
  overlay,
  setOverlay,
  invoice,
  setInvoices,
  invoices,
}) => {
  const emptyInvoice = {
    senderAddress: {},
    clientAddress: {},
    items: [],
    paymentTerms: "30 days",
  };
  const [formData, setFormData] = useState(() => emptyInvoice);

  const extractDays = (terms) => {
    if (!terms) return 0;
    const match = terms.match(/\d+/);
    return match ? Number(match[0]) : 0;
  };

  const livePaymentDue = (() => {
    if (!formData.createdAt || !formData.paymentTerms) return "";

    const days = extractDays(formData.paymentTerms);
    const date = new Date(formData.createdAt);
    date.setDate(date.getDate() + days);

    return date.toISOString().split("T")[0];
  })();

  useEffect(() => {
    if (!invoice) return;

    setFormData({
      ...emptyInvoice,
      ...invoice,
      senderAddress: {
        ...emptyInvoice.senderAddress,
        ...invoice.senderAddress,
      },
      clientAddress: {
        ...emptyInvoice.clientAddress,
        ...invoice.clientAddress,
      },
      items: invoice.items || [],
    });
  }, [invoice]);

  function handleCancel() {
    setOverlay(false);
    setOpenEditPage(false);
    document.body.classList.remove("no-scroll");
  }

  function goBack() {
    console.log("back");
    setOverlay(false);
    setOpenEditPage(false);
    document.body.classList.remove("no-scroll");
  }

  const calculateTotal = (items = []) => {
    return items.reduce((sum, item) => {
      const quantity = Number(item.quantity) || 0;
      const price = Number(item.price) || 0;
      return sum + quantity * price;
    }, 0);
  };
  function handleSave() {
    const total = calculateTotal(formData.items);

    const updatedInvoice = {
      ...formData,
      paymentDue: livePaymentDue,
      total,
    };

    setInvoices((prevInvoices) =>
      prevInvoices.map((inv) => (inv.id === formData.id ? updatedInvoice : inv))
    );

    handleCancel();
  }

  function handleAddNewItem() {
    setFormData((prev) => ({
      ...prev,
      items: [
        ...(prev.items || []),
        {
          id: crypto.randomUUID(),
          name: "",
          quantity: 1,
          price: 0,
          total: 0,
        },
      ],
    }));
  }

  return (
    <>
      {/* overlay */}
      {overlay && <div className="overlay visible"></div>}

      <div className={`edit-sidebar mobile ${openEditPage ? "" : "hidden"}`}>
        <div className="back-text-container">
          <p className="back-text" onClick={goBack}>
            {"<"} Go back
          </p>
        </div>
        <h2>
          Edit <span>#</span>
          {formData.id}
        </h2>
        <p className="bill-from">Bill From</p>
        <div className="street-address">
          <label htmlFor="street-address">Street Address</label>
          <input
            type="text"
            id="street-address"
            value={formData.senderAddress.street}
            onChange={(e) =>
              setFormData({
                ...formData,
                senderAddress: {
                  ...formData.senderAddress,
                  street: e.target.value,
                },
              })
            }
          />
        </div>

        <div className="city-postcode">
          <div className="city">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              value={formData.senderAddress.city}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  senderAddress: {
                    ...formData.senderAddress,
                    city: e.target.value,
                  },
                })
              }
            />
          </div>
          <div className="post-code">
            <label htmlFor="post-code">Post Code</label>
            <input
              type="text"
              id="post-code"
              value={formData.senderAddress.postCode}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  senderAddress: {
                    ...formData.senderAddress,
                    postCode: e.target.value,
                  },
                })
              }
            />
          </div>
        </div>
        <div className="country">
          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            value={formData.senderAddress.country}
            onChange={(e) =>
              setFormData({
                ...formData,
                senderAddress: {
                  ...formData.senderAddress,
                  country: e.target.value,
                },
              })
            }
          />
        </div>
        <p className="bill-to">Bill To</p>
        <div className="client-name">
          <label htmlFor="client-name">Client's Name</label>
          <input
            type="text"
            id="client-name"
            value={formData.clientName}
            onChange={(e) =>
              setFormData({ ...formData, clientName: e.target.value })
            }
          />
        </div>
        <div className="client-email">
          <label htmlFor="client-email">Client's Email</label>
          <input
            type="text"
            id="client-email"
            value={formData.clientEmail}
            onChange={(e) =>
              setFormData({
                ...formData,
                clientEmail: e.target.value,
              })
            }
          />
        </div>
        <div className="street-address-2">
          <label htmlFor="street-address-2">Street Address</label>
          <input
            type="text"
            id="street-address-2"
            value={formData.clientAddress.street}
            onChange={(e) =>
              setFormData({
                ...formData,
                clientAddress: {
                  ...formData.clientAddress,
                  street: e.target.value,
                },
              })
            }
          />
        </div>
        <div className="city-postcode">
          <div className="city">
            <label htmlFor="city2">City</label>
            <input
              type="text"
              id="city2"
              value={formData.clientAddress.city}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  clientAddress: {
                    ...formData.clientAddress,
                    city: e.target.value,
                  },
                })
              }
            />
          </div>
          <div className="post-code">
            <label htmlFor="post-code-2">Post Code</label>
            <input
              type="text"
              id="post-code-2"
              value={formData.clientAddress.postCode}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  clientAddress: {
                    ...formData.clientAddress,
                    postCode: e.target.value,
                  },
                })
              }
            />
          </div>
        </div>
        <div className="country">
          <label htmlFor="country2">Country</label>
          <input
            type="text"
            id="country-2"
            value={formData.clientAddress.country}
            onChange={(e) =>
              setFormData({
                ...formData,
                clientAddress: {
                  ...formData.clientAddress,
                  country: e.target.value,
                },
              })
            }
          />
        </div>
        <div className="invoice-date">
          <label htmlFor="invoice-date">Invoice Date</label>
          <input
            type="date"
            id="invoice-date"
            value={formData.createdAt}
            onChange={(e) => {
              return setFormData({
                ...formData,
                createdAt: e.target.value,
              });
            }}
          />
        </div>
        <div className="payment-terms">
          <label htmlFor="payment-terms">Payment Terms</label>
          <select
            id="payment-terms"
            value={formData.paymentTerms || "30 days"}
            onChange={(e) =>
              setFormData({
                ...formData,
                paymentTerms: e.target.value,
              })
            }
          >
            <option value="1 day">Next 1 day</option>
            <option value="7 days">Next 7 days</option>
            <option value="14 days">Next 14 days</option>
            <option value="30 days">Next 30 days</option>
          </select>
        </div>
        <div className="project-desc">
          <label htmlFor="project-desc">Project Description</label>
          <input
            type="text"
            id="project-desc"
            value={formData.description}
            onChange={(e) =>
              setFormData({
                ...formData,
                description: e.target.value,
              })
            }
          />
        </div>
        <div className="item-list">
          <p>Item List</p>
          {(formData.items || []).map((item, index) => (
            <ItemList
              key={item.id}
              item={item}
              onChange={(updatedItem) => {
                const newItems = [...formData.items];
                newItems[index] = updatedItem;

                setFormData({
                  ...formData,
                  items: newItems,
                });
              }}
              onDelete={() => {
                setFormData((prev) => {
                  const items = prev.items || [];
                  return {
                    ...prev,
                    items: items.filter((i) => i.id !== item.id),
                  };
                });
              }}
            />
          ))}
        </div>

        <div className="add-new-item" onClick={handleAddNewItem}>
          + Add New Item
        </div>
        <div className="button-row-mobile edit">
          <button className="cancel-button btn" onClick={handleCancel}>
            Cancel
          </button>
          <button className="btn save-change" onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </div>
      <div className={`edit-sidebar desktop ${openEditPage ? "edit" : ""}`}>
        <div className="edit-content">
          <h2>
            Edit <span>#{formData.id}</span>
          </h2>
          <p className="bill-from">Bill From</p>
          <div className="street-address">
            <label htmlFor="street-address">Street Address</label>
            <input
              type="text"
              id="street-address"
              value={formData.senderAddress.street}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  senderAddress: {
                    ...formData.senderAddress,
                    street: e.target.value,
                  },
                })
              }
            />
          </div>
          <div className="city-postcode">
            <div className="city">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                value={formData.senderAddress.city}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    senderAddress: {
                      ...formData.senderAddress,
                      city: e.target.value,
                    },
                  })
                }
              />
            </div>
            <div className="post-code">
              <label htmlFor="post-code">Post Code</label>
              <input
                type="text"
                id="post-code"
                value={formData.senderAddress.postCode}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    senderAddress: {
                      ...formData.senderAddress,
                      postCode: e.target.value,
                    },
                  })
                }
              />
            </div>
          </div>
          <div className="country">
            <label htmlFor="country">Country</label>
            <input
              type="text"
              id="country"
              value={formData.senderAddress.country}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  senderAddress: {
                    ...formData.senderAddress,
                    country: e.target.value,
                  },
                })
              }
            />
          </div>
          <p className="bill-to">Bill To</p>
          <div className="client-name">
            <label htmlFor="client-name">Client's Name</label>
            <input
              type="text"
              id="client-name"
              value={formData.clientName}
              onChange={(e) =>
                setFormData({ ...formData, clientName: e.target.value })
              }
            />
          </div>
          <div className="client-email">
            <label htmlFor="client-email">Client's Email</label>
            <input
              type="text"
              id="client-email"
              value={formData.clientEmail}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  clientEmail: e.target.value,
                })
              }
            />
          </div>
          <div className="street-address-2">
            <label htmlFor="street-address-2">Street Address</label>
            <input
              type="text"
              id="street-address-2"
              value={formData.clientAddress.street}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  clientAddress: {
                    ...formData.clientAddress,
                    street: e.target.value,
                  },
                })
              }
            />
          </div>
          <div className="city-postcode">
            <div className="city">
              <label htmlFor="city2">City</label>
              <input
                type="text"
                id="city2"
                value={formData.clientAddress.city}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    clientAddress: {
                      ...formData.clientAddress,
                      city: e.target.value,
                    },
                  })
                }
              />
            </div>
            <div className="post-code">
              <label htmlFor="post-code-2">Post Code</label>
              <input
                type="text"
                id="post-code-2"
                value={formData.clientAddress.postCode}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    clientAddress: {
                      ...formData.clientAddress,
                      postCode: e.target.value,
                    },
                  })
                }
              />
            </div>
          </div>
          <div className="country">
            <label htmlFor="country2">Country</label>
            <input
              type="text"
              id="country-2"
              value={formData.clientAddress.country}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  clientAddress: {
                    ...formData.clientAddress,
                    country: e.target.value,
                  },
                })
              }
            />
          </div>
          <div className="invoice-date">
            <label htmlFor="invoice-date">Invoice Date</label>
            <input
              type="date"
              id="invoice-date"
              value={formData.createdAt}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  createdAt: e.target.value,
                })
              }
            />
          </div>
          <div className="payment-terms">
            <label htmlFor="payment-terms">Payment Terms</label>
            <select
              id="payment-terms"
              value={formData.paymentTerms || "30 days"}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  paymentTerms: e.target.value,
                })
              }
            >
              <option value="1 day">Next 1 day</option>
              <option value="7 days">Next 7 days</option>
              <option value="14 days">Next 14 days</option>
              <option value="30 days">Next 30 days</option>
            </select>
          </div>
          <div className="project-desc">
            <label htmlFor="project-desc">Project Description</label>
            <input
              type="text"
              id="project-desc"
              value={formData.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: e.target.value,
                })
              }
            />
          </div>
          <div className="item-list">
            <p>Item List</p>
            {formData.items.map((item, index) => (
              <ItemList
                key={item.id}
                item={item}
                onChange={(updatedItem) => {
                  const newItems = [...formData.items];
                  newItems[index] = updatedItem;

                  setFormData({
                    ...formData,
                    items: newItems,
                  });
                }}
                onDelete={() => {
                  setFormData((prev) => {
                    const items = prev.items || [];
                    return {
                      ...prev,
                      items: items.filter((i) => i.id !== item.id),
                    };
                  });
                }}
              />
            ))}
          </div>

          <div className="add-new-item" onClick={handleAddNewItem}>
            + Add New Item
          </div>
        </div>
        <div className="button-row-desktop">
          <button className="discard-button btn" onClick={handleCancel}>
            Cancel
          </button>
          <button className="btn save-change" onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </div>
    </>
  );
};

export default EditSidebar;
