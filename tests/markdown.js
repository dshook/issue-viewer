import test from 'tape';
import markdown from '../app/client/utils/markdown.js';

test('basic markdown render', function (t) {
    t.plan(1);

    var testStr = 'Testing 1 2 3';
    var expected = '<p>Testing 1 2 3</p>';

    var actual = markdown.formatBody(testStr);
    t.equal(actual, expected);

});

test('markdown body max length', function (t) {
    t.plan(5);

    var testStr = '12 34 56 78';

    t.equal(markdown.formatBody(testStr, 2), '<p>...</p>');
    t.equal(markdown.formatBody(testStr, 3), '<p>12...</p>');
    t.equal(markdown.formatBody(testStr, 4), '<p>12...</p>');
    t.equal(markdown.formatBody(testStr, 6), '<p>12 34...</p>');
    t.equal(markdown.formatBody(testStr, 12), '<p>' + testStr + '</p>');

});

test('markdown body max length with code', function (t) {
    t.plan(1);

    var testStr = "Since AC::Parameters is no longer derived from Hash, and each nested \"hash\" inside Parameters is also an instance of AC::Parameters, https://github.com/rails/rails/blob/master/activerecord/lib/active_record/nested_attributes.rb#L446 raises an error since it only allows Hash or Array, https://github.com/rails/rails/blob/master/activerecord/lib/active_record/nested_attributes.rb#L446 calls #map which isnt supported on AC::Parameters, and https://github.com/rails/rails/blob/master/activerecord/lib/active_record/nested_attributes.rb#L471 calls #with_indifferent_access which isn't supported on AC::Parameters.\r\n\r\n I'm willing to submit a fix if wanted, just wondered whether the preferred solution would be to have AC::Parameters call #to_h on accessed elements so they return filtered hashes rather than AC::Parameters instances, or update the nested_attributes code to support AC::Parameters";
    var expected = "<p>Since AC::Parameters is no longer derived from Hash, and each nested &quot;hash&quot; inside Parameters is also an instance of AC::Parameters,...</p>";

    var actual = markdown.formatBody(testStr, 140);
    t.equal(actual, expected);

});
