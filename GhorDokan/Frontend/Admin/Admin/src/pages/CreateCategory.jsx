import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { supabase } from '../lib/supabaseClient';
import Navbar from '../components/Navbar';

const CreateCategory = ({ user, userRole }) => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [deleteCategoryId, setDeleteCategoryId] = useState('');

  useEffect(() => {
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
      <Navbar user={user} />
      <main className="mx-auto max-w-5xl px-6 pb-12 pt-8">
        <Link
          to="/products"
          className="mb-6 inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50"
        >
          <span aria-hidden="true">←</span>
          <span>Back to Products</span>
        </Link>

        <div className="rounded-lg border border-gray-200 bg-white p-8 shadow">
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

          <hr className="my-8" />

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

export default CreateCategory;
