import { useState } from "react";
import ItemListCreate from "./ItemListCreate";
const CreateInvoice = ({
  openCreatePage,
  setOpenCreatePage,
  overlay,
  setOverlay,
  setInvoices,
}) => {
  const [formData, setFormData] = useState({
    senderAddress: {
      street: "",
      city: "",
      postCode: "",
      country: "",
    },
    clientName: "",
    clientEmail: "",
    clientAddress: {
      street: "",
      city: "",
      postCode: "",
      country: "",
    },
    createdAt: "",
    paymentTerms: "30 days",
    description: "",
    items: [],
  });

  function buildInvoice(status) {
    return {
      id: Math.random().toString(36).substring(2, 8).toUpperCase(),
      createdAt: formData.createdAt || new Date().toISOString().split("T")[0],

      paymentDue: formData.createdAt
        ? calculatePaymentDue(formData.createdAt, formData.paymentTerms)
        : "",

      description: formData.description,
      clientName: formData.clientName,
      clientEmail: formData.clientEmail,
      status,
      total: formData.items.reduce((sum, item) => sum + item.total, 0),
      senderAddress: formData.senderAddress,
      clientAddress: formData.clientAddress,
      items: formData.items,
    };
  }

  function handleSubmit() {
    const newInvoice = buildInvoice("Pending");

    setInvoices((prev) => [...prev, newInvoice]);

    removeCreatePage();
  }

  function handleSaveDraft() {
    const newInvoice = buildInvoice("Draft");

    setInvoices((prev) => [...prev, newInvoice]);

    removeCreatePage();
  }

  function calculatePaymentDue(createdAt, paymentTerms) {
    const date = new Date(createdAt);

    const days = parseInt(paymentTerms);
    date.setDate(date.getDate() + days);

    return date.toISOString().split("T")[0];
  }

  function goBack() {
    console.log("back");
    setOverlay(false);
    setOpenCreatePage(false);
    document.body.classList.remove("no-scroll");
  }

  function removeCreatePage() {
    setOpenCreatePage(false);
    setOverlay(false);
    document.body.classList.remove("no-scroll");
  }
  return (
    <>
      {overlay && <div className="overlay"></div>}

      <div className={`edit-sidebar mobile ${openCreatePage ? "" : "hidden"}`}>
        <div className="back-text-container">
          <p className="back-text" onClick={goBack}>
            {"<"} Go back
          </p>
        </div>
        <h2>New Invoice</h2>
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
            type="email"
            id="client-email"
            value={formData.clientEmail}
            onChange={(e) =>
              setFormData({ ...formData, clientEmail: e.target.value })
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
            <input type="text" id="city2" />
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
              setFormData({ ...formData, createdAt: e.target.value })
            }
          />
        </div>
        <div className="payment-terms">
          <label htmlFor="payment-terms">Payment Terms</label>
          <select
            value={formData.paymentTerms}
            onChange={(e) =>
              setFormData({ ...formData, paymentTerms: e.target.value })
            }
          >
            <option value="1 day">1 day</option>
            <option value="7 days">7 days</option>
            <option value="30 days" defaultChecked>
              30 days
            </option>
          </select>
        </div>
        <div className="project-desc">
          <label htmlFor="project-desc">Project Description</label>
          <input
            type="text"
            id="project-desc"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </div>
        <div className="item-list">
          <p>Item List</p>
          {formData.items.map((item, index) => (
            <ItemListCreate
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
                setFormData({
                  ...formData,
                  items: formData.items.filter((i) => i.id !== item.id),
                });
              }}
            />
          ))}
        </div>

        <div
          className="add-new-item"
          onClick={() =>
            setFormData({
              ...formData,
              items: [
                ...formData.items,
                {
                  id: crypto.randomUUID(),
                  name: "",
                  quantity: 0,
                  price: 0,
                  total: 0,
                },
              ],
            })
          }
        >
          + Add New Item
        </div>
        <div className="button-row-mobile create">
          <button className="cancel-button btn" onClick={removeCreatePage}>
            Discard
          </button>
          <button className="draft-button-create" onClick={handleSaveDraft}>
            Save as Draft
          </button>
          <button className="btn save-change" onClick={handleSubmit}>
            Save Changes
          </button>
        </div>
      </div>
      <div className={`edit-sidebar desktop ${openCreatePage ? "edit" : ""}`}>
        <div className="edit-content">
          <h2>New Invoice</h2>
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
              type="email"
              id="client-email"
              value={formData.clientEmail}
              onChange={(e) =>
                setFormData({ ...formData, clientEmail: e.target.value })
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
              id="country2"
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
                setFormData({ ...formData, createdAt: e.target.value })
              }
            />
          </div>
          <div className="payment-terms">
            <label htmlFor="payment-terms">Payment Terms</label>

            <select
              id="payment-terms"
              value={formData.paymentTerms}
              onChange={(e) =>
                setFormData({ ...formData, paymentTerms: e.target.value })
              }
            >
              <option value="1 day">1 day</option>
              <option value="7 days">7 days</option>
              <option value="30 days">30 days</option>
            </select>
          </div>
          <div className="project-desc">
            <label htmlFor="project-desc">Project Description</label>
            <input
              type="text"
              id="project-desc"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>
          <div className="item-list">
            <p>Item List</p>
            {formData.items.map((item, index) => (
              <ItemListCreate
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
                  setFormData({
                    ...formData,
                    items: formData.items.filter((i) => i.id !== item.id),
                  });
                }}
              />
            ))}
          </div>

          <div
            className="add-new-item"
            onClick={() =>
              setFormData({
                ...formData,
                items: [
                  ...formData.items,
                  {
                    id: crypto.randomUUID(),
                    name: "",
                    quantity: 0,
                    price: 0,
                    total: 0,
                  },
                ],
              })
            }
          >
            + Add New Item
          </div>
        </div>
        <div className="button-row-desktop create">
          <button className="discard-button btn" onClick={removeCreatePage}>
            Cancel
          </button>
          <div>
            <button
              className="draft-button-create btn"
              onClick={handleSaveDraft}
            >
              Save as Draft
            </button>
            <button className="btn save-change" onClick={handleSubmit}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateInvoice;
