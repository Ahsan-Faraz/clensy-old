"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  Edit,
  Search,
  Filter,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  MoreVertical,
} from "lucide-react";

// TypeScript interfaces
interface FAQQuestion {
  _id: string;
  question: string;
  answer: string;
  category: string;
  tags: string[];
  priority: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface FormData {
  question: string;
  answer: string;
  category: string;
  tags: string[];
  priority: number;
  isActive: boolean;
}

const categories = [
  'general',
  'services',
  'pricing',
  'booking',
  'scheduling',
  'payment',
  'cleaning-products',
  'staff',
  'insurance',
  'policies',
  'special-requests',
  'maintenance',
  'commercial',
  'residential',
  'emergency'
];

export default function FAQQuestionsAdmin() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [questions, setQuestions] = useState<FAQQuestion[]>([]);
  const [filteredQuestions, setFilteredQuestions] = useState<FAQQuestion[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showActiveOnly, setShowActiveOnly] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<FAQQuestion | null>(null);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [isSaving, setIsSaving] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isCleaningUp, setIsCleaningUp] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    question: '',
    answer: '',
    category: 'general',
    tags: [],
    priority: 0,
    isActive: true
  });

  // Fetch questions with pagination and filters
  const fetchQuestions = async (page = 1, search = '', category = 'all', reset = false) => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '20',
        search: search,
        category: category
      });

      const response = await fetch(`/api/cms/faq-questions?${params}`);
      const result = await response.json();

      if (result.success && result.data) {
        if (reset || page === 1) {
          setQuestions(result.data.questions);
        } else {
          // Ensure no duplicate questions by filtering out existing IDs
          setQuestions(prev => {
            const existingIds = new Set(prev.map(q => q._id));
            const newQuestions = result.data.questions.filter((q: FAQQuestion) => !existingIds.has(q._id));
            return [...prev, ...newQuestions];
          });
        }
        
        setHasMore(result.data.pagination.hasMore);
        setCurrentPage(result.data.pagination.currentPage);
        setTotalQuestions(result.data.pagination.totalQuestions);
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
      setMessage({ type: "error", text: "Failed to load FAQ questions" });
    } finally {
      setIsLoading(false);
    }
  };

  // Initialize questions if they don't exist
  const initializeQuestions = async () => {
    try {
      const response = await fetch('/api/cms/faq-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ initialize: true })
      });
      const result = await response.json();
      if (result.success) {
        setMessage({ type: "success", text: result.message });
      }
    } catch (error) {
      console.error("Error initializing questions:", error);
    }
  };

  // Clean up duplicate questions
  const cleanupDuplicates = async () => {
    if (!confirm('This will remove duplicate questions. Are you sure?')) return;
    
    try {
      setIsCleaningUp(true);
      const response = await fetch('/api/cms/faq-questions/cleanup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      const result = await response.json();
      
      if (result.success) {
        setMessage({ 
          type: "success", 
          text: `${result.message} ${result.data.remainingQuestions} questions remain.` 
        });
        // Refresh the questions list
        fetchQuestions(1, searchQuery, selectedCategory, true);
        setTimeout(() => setMessage({ type: "", text: "" }), 5000);
      } else {
        setMessage({ type: "error", text: result.error || "Failed to cleanup duplicates" });
      }
    } catch (error) {
      console.error("Error cleaning up duplicates:", error);
      setMessage({ type: "error", text: "An error occurred during cleanup" });
    } finally {
      setIsCleaningUp(false);
    }
  };

  // Filter questions based on search and category
  useEffect(() => {
    let filtered = questions;

    if (searchQuery) {
      filtered = filtered.filter(q => 
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(q => q.category === selectedCategory);
    }

    if (showActiveOnly) {
      filtered = filtered.filter(q => q.isActive);
    }

    setFilteredQuestions(filtered);
  }, [questions, searchQuery, selectedCategory, showActiveOnly]);

  // Load data on component mount
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/protected");
    } else if (status === "authenticated") {
      initializeQuestions().then(() => {
        fetchQuestions(1, '', 'all', true);
      });
    }
  }, [status, router]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage({ type: "", text: "" });

    try {
      const url = editingQuestion 
        ? `/api/cms/faq-questions/${editingQuestion._id}`
        : '/api/cms/faq-questions';
      
      const method = editingQuestion ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (result.success) {
        setMessage({
          type: "success",
          text: editingQuestion ? "Question updated successfully!" : "Question created successfully!"
        });
        setIsModalOpen(false);
        setEditingQuestion(null);
        resetForm();
        fetchQuestions(1, searchQuery, selectedCategory, true);
        setTimeout(() => setMessage({ type: "", text: "" }), 5000);
      } else {
        setMessage({ type: "error", text: result.error || "Failed to save question" });
      }
    } catch (error) {
      console.error("Error saving question:", error);
      setMessage({ type: "error", text: "An error occurred while saving" });
    } finally {
      setIsSaving(false);
    }
  };

  // Handle delete
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this question?')) return;

    try {
      const response = await fetch(`/api/cms/faq-questions/${id}`, {
        method: 'DELETE'
      });

      const result = await response.json();

      if (result.success) {
        setMessage({ type: "success", text: "Question deleted successfully!" });
        fetchQuestions(1, searchQuery, selectedCategory, true);
        setTimeout(() => setMessage({ type: "", text: "" }), 5000);
      } else {
        setMessage({ type: "error", text: result.error || "Failed to delete question" });
      }
    } catch (error) {
      console.error("Error deleting question:", error);
      setMessage({ type: "error", text: "An error occurred while deleting" });
    }
  };

  // Handle edit
  const handleEdit = (question: FAQQuestion) => {
    setEditingQuestion(question);
    setFormData({
      question: question.question,
      answer: question.answer,
      category: question.category,
      tags: question.tags,
      priority: question.priority,
      isActive: question.isActive
    });
    setIsModalOpen(true);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      question: '',
      answer: '',
      category: 'general',
      tags: [],
      priority: 0,
      isActive: true
    });
    setEditingQuestion(null);
  };

  // Handle tag input
  const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.currentTarget.value.trim()) {
      e.preventDefault();
      const newTag = e.currentTarget.value.trim().toLowerCase();
      if (!formData.tags.includes(newTag)) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, newTag]
        }));
      }
      e.currentTarget.value = '';
    }
  };

  // Remove tag
  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  // Format category name
  const formatCategoryName = (category: string) => {
    return category.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  if (isLoading && questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#007bff]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link
                href="/admin"
                className="inline-flex items-center text-[#007bff] hover:text-blue-700 mr-6 transition-colors"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Admin
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  FAQ Questions Management
                </h1>
                <p className="text-gray-600">
                  Manage all {totalQuestions} FAQ questions with search, filtering, and categorization
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={cleanupDuplicates}
                disabled={isCleaningUp}
                className="bg-orange-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-orange-700 transition-colors disabled:opacity-50 flex items-center"
              >
                {isCleaningUp ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                    Cleaning...
                  </>
                ) : (
                  <>
                    <Trash2 className="h-5 w-5 mr-2" />
                    Remove Duplicates
                  </>
                )}
              </button>
              <button
                onClick={() => {
                  resetForm();
                  setIsModalOpen(true);
                }}
                className="bg-[#007bff] text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Question
              </button>
            </div>
          </div>
        </div>

        {/* Success/Error Messages */}
        {message.text && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-6 p-4 rounded-lg ${
              message.type === "success"
                ? "bg-green-50 text-green-800 border border-green-200"
                : "bg-red-50 text-red-800 border border-red-200"
            }`}
          >
            <div className="flex items-center">
              {message.type === "success" ? (
                <CheckCircle className="h-5 w-5 mr-2" />
              ) : (
                <AlertCircle className="h-5 w-5 mr-2" />
              )}
              {message.text}
            </div>
          </motion.div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions, answers, or tags..."
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007bff] focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007bff] focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {formatCategoryName(category)}
                </option>
              ))}
            </select>

            {/* Active Filter */}
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={showActiveOnly}
                  onChange={(e) => setShowActiveOnly(e.target.checked)}
                  className="h-4 w-4 text-[#007bff] focus:ring-[#007bff] border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Active only</span>
              </label>
              <div className="text-sm text-gray-500">
                {filteredQuestions.length} of {totalQuestions} questions
              </div>
            </div>
          </div>
        </div>

        {/* Questions List */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              FAQ Questions ({filteredQuestions.length})
            </h2>
          </div>

          <div className="divide-y divide-gray-200">
            {filteredQuestions.map((question) => (
              <div key={question._id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {formatCategoryName(question.category)}
                      </span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        question.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {question.isActive ? 'Active' : 'Inactive'}
                      </span>
                      {question.priority > 0 && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          Priority: {question.priority}
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {question.question}
                    </h3>
                    
                    <p className="text-gray-600 mb-3 line-clamp-2">
                      {question.answer}
                    </p>
                    
                    {question.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-2">
                        {question.tags.map((tag, tagIndex) => (
                          <span
                            key={`${question._id}-${tag}-${tagIndex}`}
                            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    <div className="text-xs text-gray-500">
                      Created: {new Date(question.createdAt).toLocaleDateString()}
                      {question.updatedAt !== question.createdAt && (
                        <span className="ml-4">
                          Updated: {new Date(question.updatedAt).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => handleEdit(question)}
                      className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                      title="Edit question"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(question._id)}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                      title="Delete question"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredQuestions.length === 0 && (
            <div className="text-center py-12">
              <Search className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No questions found
              </h3>
              <p className="text-gray-500">
                {searchQuery || selectedCategory !== 'all' 
                  ? 'Try adjusting your search or filters'
                  : 'Get started by adding your first FAQ question'}
              </p>
            </div>
          )}
        </div>

        {/* Load More */}
        {hasMore && (
          <div className="text-center mt-8">
            <button
              onClick={() => fetchQuestions(currentPage + 1, searchQuery, selectedCategory, false)}
              disabled={isLoading}
              className="bg-[#007bff] text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Loading...' : 'Load More'}
            </button>
          </div>
        )}
      </div>

      {/* Modal for Add/Edit Question */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingQuestion ? 'Edit Question' : 'Add New Question'}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Question */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Question *
                </label>
                <input
                  type="text"
                  value={formData.question}
                  onChange={(e) => setFormData(prev => ({ ...prev, question: e.target.value }))}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007bff] focus:border-transparent"
                  placeholder="Enter the FAQ question"
                />
              </div>

              {/* Answer */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Answer *
                </label>
                <textarea
                  value={formData.answer}
                  onChange={(e) => setFormData(prev => ({ ...prev, answer: e.target.value }))}
                  required
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007bff] focus:border-transparent"
                  placeholder="Enter the detailed answer"
                />
              </div>

              {/* Category and Priority */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007bff] focus:border-transparent"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {formatCategoryName(category)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority
                  </label>
                  <input
                    type="number"
                    value={formData.priority}
                    onChange={(e) => setFormData(prev => ({ ...prev, priority: parseInt(e.target.value) || 0 }))}
                    min="0"
                    max="10"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007bff] focus:border-transparent"
                    placeholder="0-10 (higher = more important)"
                  />
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags
                </label>
                <input
                  type="text"
                  onKeyDown={handleTagInput}
                  placeholder="Type a tag and press Enter"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007bff] focus:border-transparent"
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={`${tag}-${index}`}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-2 text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Active Status */}
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                    className="h-4 w-4 text-[#007bff] focus:ring-[#007bff] border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">Active (visible to users)</span>
                </label>
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    resetForm();
                  }}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="bg-[#007bff] text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center"
                >
                  {isSaving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      {editingQuestion ? 'Update' : 'Create'}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}