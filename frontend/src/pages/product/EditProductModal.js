import React from "react";
import { Modal } from "../../component";

export const EditProductModal = (props) => {
  const { handleClose, open, selectedProduct } = props;

  return (
    <div>
      <Modal handleClose={handleClose} open={open}>
        {selectedProduct && (
          <div className="d-flex flex-direction-c gap-10">
            <div className="d-flex just-c">
              <h3>Edit Product</h3>
            </div>
            <input placeholder="Name" value={selectedProduct.name}></input>
            <input placeholder="Price" value={selectedProduct.price}></input>
            <input
              placeholder="Description"
              value={selectedProduct.description}
            ></input>
            <input
              placeholder="Category"
              value={selectedProduct.category}
            ></input>

            <div className="d-flex just-s-evenly margin-top-10">
              <button>Edit Submit</button>
              <button onClick={handleClose}>Cancel</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
