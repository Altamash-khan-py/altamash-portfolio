'use client';

import { motion } from 'framer-motion';
import { BookOpen, Star, Quote } from 'lucide-react';
import { useBooks } from '@/hooks/use-books';
import { formatDate } from '@portfolio/utils';
import type { BookDto } from '@portfolio/types';

function BookCard({ book, index }: { book: BookDto; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group card-hover flex gap-4 p-4 rounded-xl bg-card border border-border"
    >
      {/* Cover */}
      <div className="flex-shrink-0 w-20 h-28 rounded-lg bg-secondary overflow-hidden">
        {book.coverUrl ? (
          <img
            src={book.coverUrl}
            alt={book.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <BookOpen className="w-8 h-8 text-muted-foreground/30" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-semibold truncate">{book.title}</h3>
          {book.isFavorite && (
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 flex-shrink-0" />
          )}
        </div>
        
        <p className="text-sm text-muted-foreground mb-2">{book.author}</p>
        
        {book.rating && (
          <div className="flex items-center gap-1 mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < book.rating! ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground/30'
                }`}
              />
            ))}
          </div>
        )}
        
        {book.readDate && (
          <p className="text-xs text-muted-foreground">
            Read in {formatDate(book.readDate, 'MMMM yyyy')}
          </p>
        )}

        {book.quotes && (
          <div className="mt-3 pt-3 border-t border-border">
            <div className="flex items-start gap-2">
              <Quote className="w-3 h-3 text-muted-foreground flex-shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground italic line-clamp-2">
                {book.quotes}
              </p>
            </div>
          </div>
        )}
      </div>
    </motion.article>
  );
}

export function LibrarySection() {
  const { data: books, isLoading } = useBooks();

  if (isLoading) {
    return (
      <section id="library" className="section">
        <div className="section-container">
          <div className="animate-pulse text-muted-foreground">Loading...</div>
        </div>
      </section>
    );
  }

  const favoriteBooks = books?.filter((b) => b.isFavorite) || [];
  const otherBooks = books?.filter((b) => !b.isFavorite) || [];

  return (
    <section id="library" className="section bg-card">
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="text-sm font-medium text-muted-foreground mb-2 block">Learning</span>
          <h2 className="text-3xl md:text-4xl font-bold">Library</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl">
            Books that have shaped my thinking and approach to software development, data science, and entrepreneurship.
          </p>
        </motion.div>

        {/* Favorite Books */}
        {favoriteBooks.length > 0 && (
          <div className="mb-8">
            <h3 className="text-sm font-medium text-muted-foreground mb-4 flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-500" />
              Favorites
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {favoriteBooks.map((book, index) => (
                <BookCard key={book.id} book={book} index={index} />
              ))}
            </div>
          </div>
        )}

        {/* Other Books */}
        {otherBooks.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-4">More Reads</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {otherBooks.map((book, index) => (
                <BookCard key={book.id} book={book} index={index} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
