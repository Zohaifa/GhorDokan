import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { supabase } from '../lib/supabaseClient';
import Navbar from '../components/Navbar';

const CreateProduct = ({ userRole }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  
  // Product form state
  const [productName, setProductName] = useState('');
  const [productImage, setProductImage] = useState(null);
  const [productImagePreview, setProductImagePreview] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDiscount, setProductDiscount] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productStock, setProductStock] = useState('');

  // Category form state
  const [categoryName, setCategoryName] = useState('');
  const [deleteCategoryId, setDeleteCategoryId] = useState('');

  useEffect(() => {
    // Fetch categories
    const fetchCategories = async () => {
      const { data, error } = await supabase.from('categories').select('*');
      if (error) {
        console.error('Error fetching categories:', error);
        return;
      }
      setCategories(data || []);
    };

    fetchCategories();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setProductImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProductImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    
    if (!productImage) {
      toast.error('Please select an image');
      return;
    }

    setLoading(true);
    try {
      // Upload image to storage
      const fileName = `${Date.now()}-${productImage.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(`products/${fileName}`, productImage);

      if (uploadError) {
        toast.error(`Image upload failed: ${uploadError.message}`);
        setLoading(false);
        return;
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('product-images')
        .getPublicUrl(`products/${fileName}`);

      // Create product
      const { data: productData, error: productError } = await supabase
        .from('products')
        .insert({
          name: productName,
          description: productDescription,
          price: parseFloat(productPrice),
          stock: parseInt(productStock),
          is_active: true,
        })
        .select()
        .single();

      if (productError) {
        toast.error(`Product creation failed: ${productError.message}`);
        setLoading(false);
        return;
      }

      // Create product image record
      const { error: imageError } = await supabase
        .from('product_images')
        .insert({
          product_id: productData.id,
          image_url: urlData.publicUrl,
          is_primary: true,
          sort_order: 1,
        });

      if (imageError) {
        console.warn('Image record creation warning:', imageError);
      }

      // Link to category if selected
      if (productCategory) {
        const { error: categoryError } = await supabase
          .from('product_categories')
          .insert({
            product_id: productData.id,
            category_id: productCategory,
          });

        if (categoryError) {
          console.warn('Category link warning:', categoryError);
        }
      }

      toast.success('Product created successfully!');
      
      // Reset form
      setProductName('');
      setProductImage(null);
      setProductImagePreview('');
      setProductDescription('');
      setProductPrice('');
      setProductDiscount('');
      setProductCategory('');
      setProductStock('');
      setLoading(false);

    } catch (err) {
      console.error('Unexpected error:', err);
      toast.error('An unexpected error occurred');
      setLoading(false);
    }
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    
    if (!categoryName.trim()) {
      toast.error('Category name cannot be empty');
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('categories')
        .insert({ name: categoryName })
        .select();

      if (error) {
        toast.error(`Category creation failed: ${error.message}`);
      } else {
        toast.success('Category created successfully!');
        setCategoryName('');
        setCategories([...categories, data[0]]);
      }
    } catch (err) {
      console.error('Error:', err);
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = async (e) => {
    e.preventDefault();
    
    if (!deleteCategoryId) {
      toast.error('Please select a category to delete');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', deleteCategoryId);

      if (error) {
        toast.error(`Category deletion failed: ${error.message}`);
      } else {
        toast.success('Category deleted successfully!');
        setDeleteCategoryId('');
        setCategories(categories.filter(c => c.id !== deleteCategoryId));
      }
    } catch (err) {
      console.error('Error:', err);
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar user={null} />
      <main className="mx-auto max-w-5xl px-6 pb-12 pt-8">
        <Link
          to="/products"
          className="mb-6 inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50"
        >
          <span aria-hidden="true">←</span>
          <span>Back to Products</span>
        </Link>

        {/* Product Section */}
        <div className="mb-12 rounded-lg border border-gray-200 bg-white p-8 shadow">
          <h2 className="text-2xl font-bold text-gray-900">Add Product</h2>
          <div className="mt-2 mb-6 h-1 w-20 rounded-full bg-amber-600" />

          <form onSubmit={handleProductSubmit} className="space-y-6">
            <div>
              <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
                Product Name
              </label>
              <input
                type="text"
                id="productName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Product name"
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-600"
                required
              />
            </div>

            <div>
              <label htmlFor="productImage" className="block text-sm font-medium text-gray-700">
                Image
              </label>
              <input
                type="file"
                id="productImage"
                onChange={handleImageChange}
                accept="image/*"
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-600"
                required
              />
              {productImagePreview && (
                <div className="mt-4">
                  <img src={productImagePreview} alt="Preview" className="h-48 w-full object-cover rounded-lg" />
                </div>
              )}
            </div>

            <div>
              <label htmlFor="productDescription" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="productDescription"
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                placeholder="Product description"
                rows={4}
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-600"
                required
              />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="productPrice" className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <input
                  type="number"
                  id="productPrice"
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                  placeholder="0.00"
                  step="0.01"
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-600"
                  required
                />
              </div>

              <div>
                <label htmlFor="productStock" className="block text-sm font-medium text-gray-700">
                  Stock
                </label>
                <input
                  type="number"
                  id="productStock"
                  value={productStock}
                  onChange={(e) => setProductStock(e.target.value)}
                  placeholder="0"
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-600"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="productCategory" className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                id="productCategory"
                value={productCategory}
                onChange={(e) => setProductCategory(e.target.value)}
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-600"
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700 disabled:opacity-50 sm:w-auto"
            >
              {loading ? 'Uploading...' : 'Upload Product'}
            </button>
          </form>
        </div>

        {/* Category Section */}
        <div className="mb-12 rounded-lg border border-gray-200 bg-white p-8 shadow">
          <h2 className="text-2xl font-bold text-gray-900">Manage Categories</h2>
          <div className="mt-2 mb-6 h-1 w-20 rounded-full bg-amber-600" />

          <form onSubmit={handleCategorySubmit} className="space-y-6 mb-8">
            <div>
              <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700">
                New Category Name
              </label>
              <input
                type="text"
                id="categoryName"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="Category name"
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-600"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700 disabled:opacity-50 sm:w-auto"
            >
              {loading ? 'Creating...' : 'Add Category'}
            </button>
          </form>

          <form onSubmit={handleDeleteCategory} className="space-y-6">
            <div>
              <label htmlFor="deleteCategorySelect" className="block text-sm font-medium text-gray-700">
                Delete Category
              </label>
              <select
                id="deleteCategorySelect"
                value={deleteCategoryId}
                onChange={(e) => setDeleteCategoryId(e.target.value)}
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-600"
                required
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700 disabled:opacity-50 sm:w-auto"
            >
              {loading ? 'Deleting...' : 'Delete Category'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CreateProduct;
